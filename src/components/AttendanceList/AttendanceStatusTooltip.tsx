import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Box, Tooltip } from "@mui/material";

import {
  Attendance,
  CompanyHolidayCalendar,
  HolidayCalendar,
  Staff,
} from "../../API";
import { judgeStatus } from "./common";

export function AttendanceStatusTooltip({
  staff,
  attendance,
  holidayCalendars,
  companyHolidayCalendars,
}: {
  staff: Staff | null | undefined;
  attendance: Attendance;
  holidayCalendars: HolidayCalendar[];
  companyHolidayCalendars: CompanyHolidayCalendar[];
}) {
  const {
    workDate,
    startTime,
    endTime,
    paidHolidayFlag,
    changeRequests,
    substituteHolidayDate,
  } = attendance;

  const getStatus = judgeStatus(
    workDate,
    startTime,
    endTime,
    holidayCalendars,
    companyHolidayCalendars,
    paidHolidayFlag,
    changeRequests,
    staff,
    substituteHolidayDate
  );

  if (getStatus === "") return <Box width={24} height={24} />;

  switch (getStatus) {
    case "OK":
    case "勤務中":
      return <CheckCircleIcon color="success" />;
    case "申請中":
      return (
        <Tooltip title="申請中です。承認されるまで反映されません">
          <HourglassTopIcon color="warning" />
        </Tooltip>
      );
    case "遅刻":
    case "エラー":
      return (
        <Tooltip title="勤怠に不備があります">
          <ErrorIcon color="error" />
        </Tooltip>
      );

    default:
      return <Box width={24} height={24} />;
  }
}
