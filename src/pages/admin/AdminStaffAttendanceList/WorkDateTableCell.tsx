import { TableCell as MuiTableCell, styled } from "@mui/material";
import dayjs from "dayjs";
import { Attendance, HolidayCalendar } from "../../../API";
import getDayOfWeek from "../../../components/AttendanceList/getDayOfWeek";

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  width: theme.spacing(10),
  minWidth: theme.spacing(10),
  textAlign: "right",
}));

export function WorkDateTableCell({
  workDate,
  holidayCalendars,
}: {
  workDate: Attendance["workDate"];
  holidayCalendars: HolidayCalendar[];
}) {
  const date = dayjs(workDate);
  const isHoliday = holidayCalendars?.find(
    ({ holidayDate }) => holidayDate === workDate
  );
  const dayOfWeek = isHoliday ? "祝" : getDayOfWeek(workDate);
  return <TableCell>{`${date.format("M/D")}(${dayOfWeek})`}</TableCell>;
}
