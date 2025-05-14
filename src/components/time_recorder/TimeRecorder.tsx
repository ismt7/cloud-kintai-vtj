import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  LinearProgress,
  styled,
  Switch,
  Typography,
} from "@mui/material";
import { Logger } from "aws-amplify";
import dayjs from "dayjs";
import { useContext, useEffect, useMemo, useState } from "react";

import { AttendanceDate } from "@/lib/AttendanceDate";
import { AttendanceDateTime } from "@/lib/AttendanceDateTime";
import { AttendanceState, AttendanceStatus } from "@/lib/AttendanceState";

import { Staff } from "../../API";
import { useAppDispatchV2 } from "../../app/hooks";
import * as MESSAGE_CODE from "../../errors";
import useAttendance, {
  GoDirectlyFlag,
  ReturnDirectlyFlag,
} from "../../hooks/useAttendance/useAttendance";
import { getWorkStatus } from "../../hooks/useAttendance/WorkStatus";
import useAttendances from "../../hooks/useAttendances/useAttendances";
import fetchStaff from "../../hooks/useStaff/fetchStaff";
import { TimeRecordMailSender } from "../../lib/mail/TimeRecordMailSender";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import Clock from "../clock/Clock";
import { AttendanceErrorAlert } from "./AttendanceErrorAlert";
import { WorkStatus } from "./common";
import ClockInItem from "./items/ClockInItem";
import ClockOutItem from "./items/ClockOutItem";
import GoDirectlyItem from "./items/GoDirectlyItem";
import RestEndItem from "./items/RestEndItem";
import RestStartItem from "./items/RestStartItem";
import ReturnDirectly from "./items/ReturnDirectlyItem";
import { RestTimeMessage } from "./RestTimeMessage";
import TimeRecorderRemarks from "./TimeRecorderRemarks";
import { AuthContext } from "@/context/AuthContext";
import { AppContext } from "@/context/AppContext";

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
  const {
    attendances,
    getAttendances,
    loading: attendancesLoading,
  } = useAttendances();
  const { holidayCalendars, companyHolidayCalendars } = useContext(AppContext);

  const [workStatus, setWorkStatus] = useState<WorkStatus | null | undefined>(
    undefined
  );
  const [staff, setStaff] = useState<Staff | null | undefined>(undefined);
  const [isAttendanceError, setIsAttendanceError] = useState(false);
  const [isTimeElapsedError, setIsTimeElapsedError] = useState(false);
  const [directMode, setDirectMode] = useState(false);
  const [lastActiveTime, setLastActiveTime] = useState(dayjs());

  const today = useMemo(() => dayjs().format(AttendanceDate.DataFormat), []);
  const logger = useMemo(
    () => new Logger("TimeRecorder", "DEBUG"),
    // () => new Logger("TimeRecorder", import.meta.env.DEV ? "DEBUG" : "ERROR"),
    []
  );

  const handleVisibilityChange = useMemo(() => {
    return () => {
      const now = dayjs();
      if (document.visibilityState === "visible") {
        if (now.diff(lastActiveTime, "minute") > 5) {
          window.location.reload();
        }
        setLastActiveTime(now);
      }
    };
  }, [lastActiveTime]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

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
      .catch(() => dispatch(setSnackbarError(MESSAGE_CODE.E00001)));
  }, [cognitoUser]);

  useEffect(() => {
    if (!staff || attendanceLoading) {
      return;
    }

    logger.debug("Staff and attendance loading state:", {
      staff,
      attendanceLoading,
    });

    const errorCount = attendances
      .map((attendance) => {
        const status = new AttendanceState(
          staff,
          attendance,
          holidayCalendars,
          companyHolidayCalendars
        ).get();
        logger.debug("Attendance status for error count:", {
          attendance,
          status,
        });
        return status;
      })
      .filter((status) => status === AttendanceStatus.Error).length;

    logger.debug("Total error count:", errorCount);
    setIsAttendanceError(errorCount > 0);

    // 1週間以上前にエラーがあるかチェック
    const timeElapsedErrorCount = attendances
      ?.filter((attendance) => {
        const { workDate } = attendance;
        const isAfterOneWeek = dayjs().isAfter(dayjs(workDate).add(1, "week"));
        logger.debug("Checking time elapsed for attendance:", {
          workDate,
          isAfterOneWeek,
        });
        return isAfterOneWeek;
      })
      .map((attendance) => {
        const status = new AttendanceState(
          staff,
          attendance,
          holidayCalendars,
          companyHolidayCalendars
        ).get();
        logger.debug("Attendance status for time elapsed error count:", {
          attendance,
          status,
        });
        return status;
      })
      .filter((status) => status === AttendanceStatus.Error).length;

    logger.debug("Total time elapsed error count:", timeElapsedErrorCount);
    setIsTimeElapsedError(timeElapsedErrorCount > 0);
  }, [attendancesLoading, staff, holidayCalendars, companyHolidayCalendars]);

  useEffect(() => {
    setWorkStatus(getWorkStatus(attendance));
  }, [attendance]);

  if (attendanceLoading || attendancesLoading || workStatus === undefined) {
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
        new TimeRecordMailSender(cognitoUser, res, staff).clockIn();
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
        new TimeRecordMailSender(cognitoUser, res, staff).clockOut();
      })
      .catch((e) => {
        logger.debug(e);
        dispatch(setSnackbarError(MESSAGE_CODE.E01002));
      });
  };

  const handleGoDirectly = () => {
    if (!cognitoUser) return;

    const now = new AttendanceDateTime().setWorkStart().toISOString();

    clockIn(cognitoUser.id, today, now, GoDirectlyFlag.YES)
      .then((res) => {
        dispatch(setSnackbarSuccess(MESSAGE_CODE.S01003));
        new TimeRecordMailSender(cognitoUser, res, staff).clockIn();
      })
      .catch((e) => {
        logger.debug(e);
        dispatch(setSnackbarError(MESSAGE_CODE.E01005));
      });
  };

  const handleReturnDirectly = () => {
    if (!cognitoUser) return;

    const now = new AttendanceDateTime().setWorkEnd().toISOString();

    clockOut(cognitoUser.id, today, now, ReturnDirectlyFlag.YES)
      .then((res) => {
        dispatch(setSnackbarSuccess(MESSAGE_CODE.S01004));
        new TimeRecordMailSender(cognitoUser, res, staff).clockOut();
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

        <TimeElapsedErrorDialog isTimeElapsedError={isTimeElapsedError} />

        <Grid item xs={12}>
          <RestTimeMessage />
        </Grid>
      </Grid>
    </Box>
  );
}

function TimeElapsedErrorDialog({
  isTimeElapsedError,
}: {
  isTimeElapsedError: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isTimeElapsedError);
  }, [isTimeElapsedError]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        1週間以上経過した打刻エラーがあります
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          1週間以上経過した打刻エラーがあります。
          <br />
          勤怠一覧を確認して打刻修正を申請してください。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>あとで</Button>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
            window.open("/attendance/list", "_blank");
          }}
        >
          確認する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
