import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Badge,
  Box,
  IconButton,
  Stack,
  TableCell,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Attendance,
  CompanyHolidayCalendar,
  HolidayCalendar,
  Staff,
} from "@/API";
import { useAppDispatchV2 } from "@/app/hooks";
import useCompanyHolidayCalendars from "@/hooks/useCompanyHolidayCalendars/useCompanyHolidayCalendars";
import useHolidayCalendar from "@/hooks/useHolidayCalendars/useHolidayCalendars";
import fetchStaff from "@/hooks/useStaff/fetchStaff";
import { setSnackbarError } from "@/lib/reducers/snackbarReducer";

import * as MESSAGE_CODE from "../../errors";
import { AttendanceDaily } from "../../hooks/useAttendanceDaily/useAttendanceDaily";
import useAttendances from "../../hooks/useAttendances/useAttendances";
import { judgeStatus } from "../AttendanceList/common";

function getBadgeContent(attendances: Attendance[]) {
  const changeRequestCount = attendances.filter((attendance) =>
    attendance.changeRequests
      ? attendance.changeRequests
          .filter((item): item is NonNullable<typeof item> => item !== null)
          .filter((item) => !item.completed).length > 0
      : false
  ).length;

  return changeRequestCount;
}

function AttendanceTotalStatus({
  attendances,
  holidayCalendars,
  companyHolidayCalendars,
  staff,
}: {
  attendances: Attendance[];
  holidayCalendars: HolidayCalendar[];
  companyHolidayCalendars: CompanyHolidayCalendar[];
  staff: Staff | null | undefined;
}) {
  const errorCount = attendances
    .map(({ workDate, startTime, endTime, paidHolidayFlag, changeRequests }) =>
      judgeStatus(
        workDate,
        startTime,
        endTime,
        holidayCalendars,
        companyHolidayCalendars,
        paidHolidayFlag,
        changeRequests,
        staff
      )
    )
    .filter((item) => item !== "").length;

  return errorCount === 0 ? (
    <CheckCircleIcon color="success" />
  ) : (
    <Tooltip title="勤怠に不備があります">
      <ErrorIcon color="error" />
    </Tooltip>
  );
}

export function ActionsTableCell({ row }: { row: AttendanceDaily }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatchV2();

  const [staff, setStaff] = useState<Staff | null | undefined>(undefined);

  const {
    attendances,
    getAttendances,
    loading: attendanceLoading,
    error: attendanceError,
  } = useAttendances();

  const {
    holidayCalendars,
    loading: holidayCalendarLoading,
    error: holidayCalendarError,
  } = useHolidayCalendar();

  const {
    companyHolidayCalendars,
    loading: companyHolidayCalendarLoading,
    error: companyHolidayCalendarError,
  } = useCompanyHolidayCalendars();

  useEffect(() => {
    getAttendances(row.sub);

    fetchStaff(row.sub)
      .then((res) => {
        setStaff(res);
      })
      .catch(() => {
        dispatch(setSnackbarError(MESSAGE_CODE.E00001));
      });
  }, [row]);

  if (
    attendanceLoading ||
    holidayCalendarLoading ||
    companyHolidayCalendarLoading ||
    attendanceError ||
    holidayCalendarError ||
    companyHolidayCalendarError
  )
    return (
      <TableCell>
        <Box sx={{ width: 24, height: 24 }} />
        <Box sx={{ width: 24, height: 24 }} />
      </TableCell>
    );

  return (
    <TableCell sx={{ width: 50, minWidth: 50 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <AttendanceTotalStatus
          attendances={attendances}
          holidayCalendars={holidayCalendars}
          companyHolidayCalendars={companyHolidayCalendars}
          staff={staff}
        />
        <IconButton
          size="small"
          onClick={() => {
            const { sub: staffId } = row;
            navigate(`/admin/staff/${staffId}/attendance`);
          }}
        >
          <Badge badgeContent={getBadgeContent(attendances)} color="primary">
            <CalendarMonthIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Stack>
    </TableCell>
  );
}
