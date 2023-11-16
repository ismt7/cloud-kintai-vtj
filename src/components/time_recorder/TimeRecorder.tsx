import { useEffect, useState } from "react";

import { Box, LinearProgress, Stack, Typography } from "@mui/material";

import { Logger } from "aws-amplify";
import { useAppDispatchV2 } from "../../app/hooks";
import {
  E01001,
  E01002,
  E01003,
  E01004,
  E01005,
  E01006,
  S01001,
  S01002,
  S01003,
  S01004,
  S01005,
  S01006,
} from "../../errors";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import useLoginStaff from "../attendance_editor/hooks/useLoginStaff";
import Clock from "../clock/Clock";
import useAttendance from "./hooks/useAttendance";
import useRest from "./hooks/useRest";
import ClockInItem from "./items/ClockInItem";
import ClockOutItem from "./items/ClockOutItem";
import GoDirectlyItem from "./items/GoDirectlyItem";
import RestEndItem from "./items/RestEndItem";
import RestStartItem from "./items/RestStartItem";
import ReturnDirectly from "./items/ReturnDirectlyItem";
import TimeRecorderRemarks from "./TimeRecorderRemarks";
import { getCurrentWorkStatusV2, WorkStatus } from "./WorkStatusCodes";

export default function TimeRecorder({
  cognitoUserId,
}: {
  cognitoUserId: string | undefined;
}) {
  const dispatch = useAppDispatchV2();
  const { loginStaff, loading: loginStaffLoading } =
    useLoginStaff(cognitoUserId);
  const {
    attendance,
    clockIn,
    clockOut,
    goDirectly,
    returnDirectly,
    updateRemarks,
    loading: attendanceLoading,
  } = useAttendance(loginStaff);
  const {
    rest,
    restStart,
    restEnd,
    loading: restLoading,
  } = useRest(loginStaff);
  const [workStatus, setWorkStatus] = useState<WorkStatus | null>(null);

  const logger = new Logger(
    "TimeRecorder",
    process.env.NODE_ENV === "development" ? "DEBUG" : "ERROR"
  );

  useEffect(() => {
    setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
  }, [attendance, rest]);

  if (loginStaffLoading || attendanceLoading || restLoading || !loginStaff) {
    return <LinearProgress />;
  }

  return (
    <Box width="400px">
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" textAlign="center">
            {workStatus?.text || "読み込み中..."}
          </Typography>
        </Box>
        <Clock />
        <Stack
          direction="row"
          spacing={10}
          alignItems="flex-start"
          justifyContent="space-evenly"
        >
          <ClockInItem
            workStatus={workStatus}
            onClick={() => {
              void clockIn()
                .then(() => dispatch(setSnackbarSuccess(S01001)))
                .catch((e) => {
                  logger.debug(e);
                  dispatch(setSnackbarError(E01001));
                });
            }}
          />
          <ClockOutItem
            workStatus={workStatus}
            onClick={() => {
              void clockOut()
                .then(() => dispatch(setSnackbarSuccess(S01002)))
                .catch((e) => {
                  logger.debug(e);
                  dispatch(setSnackbarError(E01002));
                });
            }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={5}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Stack direction="row" spacing={1}>
            <GoDirectlyItem
              workStatus={workStatus}
              onClick={() => {
                void goDirectly()
                  .then(() => dispatch(setSnackbarSuccess(S01003)))
                  .catch((e) => {
                    logger.debug(e);
                    dispatch(setSnackbarError(E01005));
                  });
              }}
            />
            <ReturnDirectly
              workStatus={workStatus}
              onClick={() => {
                void returnDirectly()
                  .then(() => dispatch(setSnackbarSuccess(S01004)))
                  .catch((e) => {
                    logger.debug(e);
                    dispatch(setSnackbarError(E01006));
                  });
              }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <RestStartItem
              workStatus={workStatus}
              onClick={() => {
                void restStart()
                  .then(() => dispatch(setSnackbarSuccess(S01005)))
                  .catch((e) => {
                    logger.debug(e);
                    dispatch(setSnackbarError(E01003));
                  });
              }}
            />
            <RestEndItem
              workStatus={workStatus}
              onClick={() => {
                void restEnd()
                  .then(() => dispatch(setSnackbarSuccess(S01006)))
                  .catch((e) => {
                    logger.debug(e);
                    dispatch(setSnackbarError(E01004));
                  });
              }}
            />
          </Stack>
        </Stack>
        <TimeRecorderRemarks
          attendance={attendance}
          onSave={(remarks) => {
            void updateRemarks(remarks || "").then(() => {
              setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
            });
          }}
        />
      </Stack>
    </Box>
  );
}
