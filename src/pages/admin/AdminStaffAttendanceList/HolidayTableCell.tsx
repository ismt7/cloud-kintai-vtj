import { TableCell } from "@mui/material";

import {
  Attendance,
  CompanyHolidayCalendar,
  HolidayCalendar,
} from "../../../API";

export function HolidayTableCell({
  attendance,
  holidayCalendars,
  companyHolidayCalendars,
}: {
  attendance: Attendance;
  holidayCalendars: HolidayCalendar[];
  companyHolidayCalendars: CompanyHolidayCalendar[];
}) {
  const holidayName = holidayCalendars?.find(
    (holidayCalendar) => holidayCalendar.holidayDate === attendance.workDate
  )?.name;

  const companyHolidayName = companyHolidayCalendars?.find(
    (companyHolidayCalendar) =>
      companyHolidayCalendar.holidayDate === attendance.workDate
  )?.name;

  return (
    <TableCell sx={{ whiteSpace: "nowrap" }}>
      {holidayName || companyHolidayName || ""}
    </TableCell>
  );
}
