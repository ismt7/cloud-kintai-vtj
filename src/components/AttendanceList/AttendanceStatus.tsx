import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Tooltip } from "@mui/material";

import {
  Attendance,
  CompanyHolidayCalendar,
  HolidayCalendar,
  Staff,
} from "../../API";
import { judgeStatus } from "./common";

export function AttendanceStatus({
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
  const { workDate, startTime, endTime, paidHolidayFlag, changeRequests } =
    attendance;

  const getStatus = judgeStatus(
    workDate,
    startTime,
    endTime,
    holidayCalendars,
    companyHolidayCalendars,
    paidHolidayFlag,
    changeRequests,
    staff
  );

  if (getStatus === "") return <Box width={24} height={24} />;

  return getStatus === "OK" ? (
    <CheckCircleIcon color="success" />
  ) : (
    <Tooltip title="勤怠に不備があります">
      <ErrorIcon color="error" />
    </Tooltip>
  );
}
