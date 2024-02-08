import {
  Alert,
  AlertTitle,
  Box,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Cache, Logger } from "aws-amplify";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { useAppDispatchV2 } from "../../app/hooks";
import * as MESSAGE_CODE from "../../errors";
import useAttendance, {
  GoDirectlyFlag,
  ReturnDirectlyFlag,
} from "../../hooks/useAttendance/useAttendance";
import { getWorkStatus } from "../../hooks/useAttendance/WorkStatus";
import useCognitoUser from "../../hooks/useCognitoUser";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import Clock from "../clock/Clock";
import { WorkStatus } from "./common";
import ClockInItem from "./items/ClockInItem";
import ClockOutItem from "./items/ClockOutItem";
import GoDirectlyItem from "./items/GoDirectlyItem";
import RestEndItem from "./items/RestEndItem";
import RestStartItem from "./items/RestStartItem";
import ReturnDirectly from "./items/ReturnDirectlyItem";
import sendClockInMail from "./sendClockInMail";
import sendClockOutMail from "./sendClockOutMail";
import TimeRecorderRemarks from "./TimeRecorderRemarks";

export default function TimeRecorder() {
  const dispatch = useAppDispatchV2();
  const { cognitoUser, loading: cognitoUserLoading } = useCognitoUser();
  const {
    attendance,
    loading: attendanceLoading,
    getAttendance,
    clockIn,
    clockOut,
    restStart,
    restEnd,
    updateRemarks,
  } = useAttendance();
  const [workStatus, setWorkStatus] = useState<WorkStatus | null | undefined>(
    undefined
  );

  const today = dayjs().format("YYYY-MM-DD");
  const logger = new Logger(
    "TimeRecorder",
    process.env.NODE_ENV === "development" ? "DEBUG" : "ERROR"
  );

  useEffect(() => {
    if (!Cache.getItem("reloadTimer")) {
      Cache.setItem("reloadTimer", true, {
        expires: dayjs().add(10, "minute").toDate().getTime(),
      });
    }

    setInterval(() => {
      if (!Cache.getItem("reloadTimer")) {
        // eslint-disable-next-line no-alert
        alert("ページの有効期限が切れました。リロードしてください。");
        Cache.setItem("reloadTimer", true, {
          expires: dayjs().add(10, "minute").toDate().getTime(),
        });
      }
    }, 10000);
  }, []);

  useEffect(() => {
    if (!cognitoUser) return;

    getAttendance(cognitoUser.id, today).catch(() =>
      dispatch(setSnackbarError(MESSAGE_CODE.E01001))
    );
  }, [cognitoUser]);

  useEffect(() => {
    setWorkStatus(getWorkStatus(attendance));
  }, [attendance]);

  if (
    attendanceLoading ||
    cognitoUserLoading ||
    cognitoUser === undefined ||
    workStatus === undefined
  ) {
    return <LinearProgress />;
  }

  if (cognitoUser === null || workStatus === null) {
    dispatch(setSnackbarError(MESSAGE_CODE.E00001));
    return null;
  }

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "400px",
        },
        mx: {
          xs: 3,
          md: 0,
        },
      }}
    >
      <Stack
        spacing={{
          xs: 2,
          md: 3,
        }}
      >
        <Box>
          <Typography variant="h6" textAlign="center">
            {workStatus.text || "読み込み中..."}
          </Typography>
        </Box>
        <Clock />
        <Stack
          direction="row"
          spacing={{
            xs: 2,
            md: 10,
          }}
          alignItems="flex-start"
          justifyContent="space-evenly"
        >
          <ClockInItem
            workStatus={workStatus}
            onClick={() => {
              if (!cognitoUser) return;

              const now = dayjs().second(0).millisecond(0).toISOString();
              clockIn(cognitoUser.id, today, now)
                .then((res) => {
                  dispatch(setSnackbarSuccess(MESSAGE_CODE.S01001));
                  sendClockInMail(cognitoUser, res);
                })
                .catch((e) => {
                  logger.debug(e);
                  dispatch(setSnackbarError(MESSAGE_CODE.E01001));
                });
            }}
          />
          <ClockOutItem
            workStatus={workStatus}
            onClick={() => {
              if (!cognitoUser) return;

              const now = dayjs().second(0).millisecond(0).toISOString();
              clockOut(cognitoUser.id, today, now)
                .then((res) => {
                  dispatch(setSnackbarSuccess(MESSAGE_CODE.S01002));
                  sendClockOutMail(cognitoUser, res);
                })
                .catch((e) => {
                  logger.debug(e);
                  dispatch(setSnackbarError(MESSAGE_CODE.E01002));
                });
            }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={{
            xs: 2,
            md: 5,
          }}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Stack direction="row" spacing={1}>
            <GoDirectlyItem
              workStatus={workStatus}
              onClick={() => {
                if (!cognitoUser) return;

                const now = dayjs()
                  .hour(9)
                  .minute(0)
                  .second(0)
                  .millisecond(0)
                  .toISOString();
                clockIn(cognitoUser.id, today, now, GoDirectlyFlag.YES)
                  .then((res) => {
                    dispatch(setSnackbarSuccess(MESSAGE_CODE.S01003));
                    sendClockInMail(cognitoUser, res);
                  })
                  .catch((e) => {
                    logger.debug(e);
                    dispatch(setSnackbarError(MESSAGE_CODE.E01005));
                  });
              }}
            />
            <ReturnDirectly
              workStatus={workStatus}
              onClick={() => {
                if (!cognitoUser) return;

                const now = dayjs()
                  .hour(18)
                  .minute(0)
                  .second(0)
                  .millisecond(0)
                  .toISOString();
                clockOut(cognitoUser.id, today, now, ReturnDirectlyFlag.YES)
                  .then((res) => {
                    dispatch(setSnackbarSuccess(MESSAGE_CODE.S01004));
                    sendClockOutMail(cognitoUser, res);
                  })
                  .catch((e) => {
                    logger.debug(e);
                    dispatch(setSnackbarError(MESSAGE_CODE.E01006));
                  });
              }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <RestStartItem
              workStatus={workStatus}
              onClick={() => {
                if (!cognitoUser) return;

                const now = dayjs().second(0).millisecond(0).toISOString();
                restStart(cognitoUser.id, today, now)
                  .then(() => dispatch(setSnackbarSuccess(MESSAGE_CODE.S01005)))
                  .catch((e) => {
                    logger.debug(e);
                    dispatch(setSnackbarError(MESSAGE_CODE.E01003));
                  });
              }}
            />
            <RestEndItem
              workStatus={workStatus}
              onClick={() => {
                if (!cognitoUser) return;

                const now = dayjs().second(0).millisecond(0).toISOString();
                restEnd(cognitoUser.id, today, now)
                  .then(() => dispatch(setSnackbarSuccess(MESSAGE_CODE.S01006)))
                  .catch((e) => {
                    logger.debug(e);
                    dispatch(setSnackbarError(MESSAGE_CODE.E01004));
                  });
              }}
            />
          </Stack>
        </Stack>
        <TimeRecorderRemarks
          attendance={attendance}
          onSave={(remarks) => {
            if (!cognitoUser) return;

            updateRemarks(cognitoUser.id, today, remarks || "")
              .then(() => {
                dispatch(setSnackbarSuccess(MESSAGE_CODE.S02003));
              })
              .catch((e) => {
                logger.debug(e);
                dispatch(setSnackbarError(MESSAGE_CODE.E02003));
              });
          }}
        />
      </Stack>
      <Alert severity="info" sx={{ mt: 2 }}>
        <AlertTitle>昼休憩は退勤時に自動打刻されます</AlertTitle>
        <Typography variant="body2">
          修正する際は、変更リクエストまたは、管理者へ問い合わせてください。
        </Typography>
      </Alert>
    </Box>
  );
}
