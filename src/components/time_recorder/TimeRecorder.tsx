import {
  Box,
  FormControlLabel,
  Grid,
  LinearProgress,
  styled,
  Switch,
  Typography,
} from "@mui/material";
import { Cache, Logger } from "aws-amplify";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";

import { Staff } from "../../API";
import { useAppDispatchV2 } from "../../app/hooks";
import * as MESSAGE_CODE from "../../errors";
import useAttendance, {
  GoDirectlyFlag,
  ReturnDirectlyFlag,
} from "../../hooks/useAttendance/useAttendance";
import { getWorkStatus } from "../../hooks/useAttendance/WorkStatus";
import useAttendances from "../../hooks/useAttendances/useAttendances";
import useCompanyHolidayCalendars from "../../hooks/useCompanyHolidayCalendars/useCompanyHolidayCalendars";
import useHolidayCalendars from "../../hooks/useHolidayCalendars/useHolidayCalendars";
import fetchStaff from "../../hooks/useStaff/fetchStaff";
import { AuthContext } from "../../Layout";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import { judgeStatus } from "../AttendanceList/common";
import Clock from "../clock/Clock";
import { AdminMailSender } from "./AdminMailSender";
import { AttendanceErrorAlert } from "./AttendanceErrorAlert";
import { WorkStatus } from "./common";
import ClockInItem from "./items/ClockInItem";
import ClockOutItem from "./items/ClockOutItem";
import GoDirectlyItem from "./items/GoDirectlyItem";
import RestEndItem from "./items/RestEndItem";
import RestStartItem from "./items/RestStartItem";
import ReturnDirectly from "./items/ReturnDirectlyItem";
import { RestTimeMessage } from "./RestTimeMessage";
import { StaffMailSender } from "./StaffMailSender";
import TimeRecorderRemarks from "./TimeRecorderRemarks";

const DirectSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function TimeRecorder() {
  const { cognitoUser } = useContext(AuthContext);
  const dispatch = useAppDispatchV2();
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
  const { attendances, getAttendances } = useAttendances();
  const { holidayCalendars, loading: holidayCalendarLoading } =
    useHolidayCalendars();
  const { companyHolidayCalendars, loading: companyHolidayCalendarLoading } =
    useCompanyHolidayCalendars();

  const [workStatus, setWorkStatus] = useState<WorkStatus | null | undefined>(
    undefined
  );
  const [staff, setStaff] = useState<Staff | null | undefined>(undefined);
  const [isAttendanceError, setIsAttendanceError] = useState(false);
  const [directMode, setDirectMode] = useState(false);

  const today = dayjs().format("YYYY-MM-DD");
  const logger = new Logger(
    "TimeRecorder",
    import.meta.env.DEV ? "DEBUG" : "ERROR"
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
        const confirm = window.confirm(
          "ページの有効期限が切れました。リロードしてください。"
        );
        if (confirm) {
          window.location.reload();
        }
        Cache.setItem("reloadTimer", true, {
          expires: dayjs().add(10, "minute").toDate().getTime(),
        });
      }
    }, 10000);
  }, []);

  useEffect(() => {
    if (!cognitoUser) return;

    getAttendance(cognitoUser.id, today).catch(() => {
      dispatch(setSnackbarError(MESSAGE_CODE.E01001));
    });

    getAttendances(cognitoUser.id).catch(() =>
      dispatch(setSnackbarError(MESSAGE_CODE.E02001))
    );

    fetchStaff(cognitoUser.id)
      .then(setStaff)
      .catch((e) => {
        console.log(e);
        dispatch(setSnackbarError(MESSAGE_CODE.E00001));
      });
  }, [cognitoUser]);

  useEffect(() => {
    if (
      !attendances ||
      holidayCalendarLoading ||
      companyHolidayCalendarLoading
    ) {
      return;
    }

    const errorCount = attendances
      .map((attendance) => {
        const {
          workDate,
          startTime,
          endTime,
          paidHolidayFlag,
          changeRequests,
        } = attendance;
        return judgeStatus(
          workDate,
          startTime,
          endTime,
          holidayCalendars,
          companyHolidayCalendars,
          paidHolidayFlag,
          changeRequests,
          staff
        );
      })
      .filter((status) => status === "エラー").length;

    setIsAttendanceError(errorCount > 0);
  }, [attendances]);

  useEffect(() => {
    setWorkStatus(getWorkStatus(attendance));
  }, [attendance]);

  if (attendanceLoading || workStatus === undefined) {
    return (
      <Box
        sx={{
          width: { xs: "100%", md: "400px" },
        }}
      >
        <LinearProgress />
      </Box>
    );
  }

  if (workStatus === null) {
    dispatch(setSnackbarError(MESSAGE_CODE.E00001));
    return null;
  }

  const handleClockIn = () => {
    if (!cognitoUser) return;

    const now = dayjs().second(0).millisecond(0).toISOString();
    clockIn(cognitoUser.id, today, now)
      .then((res) => {
        dispatch(setSnackbarSuccess(MESSAGE_CODE.S01001));
        new StaffMailSender(cognitoUser, res).clockIn();
        new AdminMailSender(cognitoUser, res).clockIn();
      })
      .catch((e) => {
        logger.debug(e);
        dispatch(setSnackbarError(MESSAGE_CODE.E01001));
      });
  };

  const handleClockOut = () => {
    if (!cognitoUser) return;

    const now = dayjs().second(0).millisecond(0).toISOString();
    clockOut(cognitoUser.id, today, now)
      .then((res) => {
        dispatch(setSnackbarSuccess(MESSAGE_CODE.S01002));
        new StaffMailSender(cognitoUser, res).clockOut();
        new AdminMailSender(cognitoUser, res).clockOut();
      })
      .catch((e) => {
        logger.debug(e);
        dispatch(setSnackbarError(MESSAGE_CODE.E01002));
      });
  };

  const handleGoDirectly = () => {
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
        new StaffMailSender(cognitoUser, res).clockIn();
        new AdminMailSender(cognitoUser, res).clockIn();
      })
      .catch((e) => {
        logger.debug(e);
        dispatch(setSnackbarError(MESSAGE_CODE.E01005));
      });
  };

  const handleReturnDirectly = () => {
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
        new StaffMailSender(cognitoUser, res).clockOut();
        new AdminMailSender(cognitoUser, res).clockOut();
      })
      .catch((e) => {
        logger.debug(e);
        dispatch(setSnackbarError(MESSAGE_CODE.E01006));
      });
  };

  const handleRestStart = () => {
    if (!cognitoUser) return;

    const now = dayjs().second(0).millisecond(0).toISOString();
    restStart(cognitoUser.id, today, now)
      .then(() => dispatch(setSnackbarSuccess(MESSAGE_CODE.S01005)))
      .catch((e) => {
        logger.debug(e);
        dispatch(setSnackbarError(MESSAGE_CODE.E01003));
      });
  };

  const handleRestEnd = () => {
    if (!cognitoUser) return;

    const now = dayjs().second(0).millisecond(0).toISOString();
    restEnd(cognitoUser.id, today, now)
      .then(() => dispatch(setSnackbarSuccess(MESSAGE_CODE.S01006)))
      .catch((e) => {
        logger.debug(e);
        dispatch(setSnackbarError(MESSAGE_CODE.E01004));
      });
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "400px" },
        mx: { xs: 3, md: 0 },
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" textAlign="center">
            {workStatus.text || "読み込み中..."}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Clock />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <DirectSwitch onChange={() => setDirectMode(!directMode)} />
            }
            label="直行/直帰モード"
          />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          {directMode ? (
            <GoDirectlyItem
              workStatus={workStatus}
              onClick={handleGoDirectly}
            />
          ) : (
            <ClockInItem workStatus={workStatus} onClick={handleClockIn} />
          )}
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          {directMode ? (
            <ReturnDirectly
              workStatus={workStatus}
              onClick={handleReturnDirectly}
            />
          ) : (
            <ClockOutItem workStatus={workStatus} onClick={handleClockOut} />
          )}
        </Grid>

        {/* 休憩 */}
        <Grid item xs={6}>
          <RestStartItem workStatus={workStatus} onClick={handleRestStart} />
        </Grid>
        <Grid item xs={6}>
          <RestEndItem workStatus={workStatus} onClick={handleRestEnd} />
        </Grid>

        <Grid item xs={12}>
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
        </Grid>
        {isAttendanceError && (
          <Grid item xs={12}>
            <AttendanceErrorAlert />
          </Grid>
        )}
        <Grid item xs={12}>
          <RestTimeMessage />
        </Grid>
      </Grid>
    </Box>
  );
}
