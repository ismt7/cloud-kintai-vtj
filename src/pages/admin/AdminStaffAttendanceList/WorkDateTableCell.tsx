import { styled, TableCell as MuiTableCell } from "@mui/material";
import dayjs from "dayjs";

import { CompanyHoliday } from "@/lib/CompanyHoliday";
import { Holiday } from "@/lib/Holiday";

import {
  Attendance,
  CompanyHolidayCalendar,
  HolidayCalendar,
} from "../../../API";
import getDayOfWeek from "../../../components/AttendanceList/getDayOfWeek";

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  width: theme.spacing(10),
  minWidth: theme.spacing(10),
  textAlign: "left",
}));

export function WorkDateTableCell({
  workDate,
  holidayCalendars,
  companyHolidayCalendars,
}: {
  workDate: Attendance["workDate"];
  holidayCalendars: HolidayCalendar[];
  companyHolidayCalendars: CompanyHolidayCalendar[];
}) {
  const date = dayjs(workDate);

  const holiday = new Holiday(holidayCalendars, workDate);
  const holidayName = holiday.getHoliday()?.name;
  const dayOfWeek = holiday.isHoliday() ? "祝" : getDayOfWeek(workDate);

  const companyHoliday = new CompanyHoliday(companyHolidayCalendars, workDate);
  const companyHolidayName = companyHoliday.getHoliday()?.name;

  return (
    <TableCell sx={{ whiteSpace: "nowrap" }}>{`${date.format(
      "M/D"
    )}(${dayOfWeek}) ${holidayName || companyHolidayName || ""}`}</TableCell>
  );
}
