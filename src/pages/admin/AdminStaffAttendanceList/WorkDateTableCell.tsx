import { styled, TableCell as MuiTableCell } from "@mui/material";
import dayjs from "dayjs";

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
  const isHoliday = holidayCalendars?.find(
    ({ holidayDate }) => holidayDate === workDate
  );
  const dayOfWeek = isHoliday ? "祝" : getDayOfWeek(workDate);
  const holidayName = holidayCalendars?.find(
    (holidayCalendar) => holidayCalendar.holidayDate === workDate
  )?.name;

  const companyHolidayName = companyHolidayCalendars?.find(
    (companyHolidayCalendar) => companyHolidayCalendar.holidayDate === workDate
  )?.name;

  return (
    <TableCell sx={{ whiteSpace: "nowrap" }}>{`${date.format(
      "M/D"
    )}(${dayOfWeek}) ${holidayName || companyHolidayName || ""}`}</TableCell>
  );
}
