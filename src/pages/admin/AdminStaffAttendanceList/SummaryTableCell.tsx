import {TableCell } from "@mui/material";

import {
  Attendance,
  CompanyHolidayCalendar,
  HolidayCalendar,
} from "../../../API";

export function SummaryTableCell({
  workDate,
  paidHolidayFlag,
  remarks,
  holidayCalendars,
  companyHolidayCalendars,
}: {
  workDate: Attendance["workDate"];
  paidHolidayFlag: Attendance["paidHolidayFlag"];
  remarks: Attendance["remarks"];
  holidayCalendars: HolidayCalendar[];
  companyHolidayCalendars: CompanyHolidayCalendar[];
}) {
  const text = (() => {
    const isHoliday = holidayCalendars?.find(
      ({ holidayDate }) => holidayDate === workDate
    );

    const isCompanyHoliday = companyHolidayCalendars?.find(
      ({ holidayDate }) => holidayDate === workDate
    );

    const summaryMessage = [];
    if (paidHolidayFlag) summaryMessage.push("有給休暇");
    if (isHoliday) summaryMessage.push(isHoliday.name);
    if (isCompanyHoliday) summaryMessage.push(isCompanyHoliday.name);
    if (remarks) summaryMessage.push(remarks);

    return summaryMessage.join(" ");
  })();

  return <TableCell sx={{ width: 1 }}>{text}</TableCell>;
}
