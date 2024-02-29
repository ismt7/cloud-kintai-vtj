import { TableCell as MuiTableCell, styled } from "@mui/material";
import dayjs from "dayjs";
import { Attendance } from "../../../API";

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  width: theme.spacing(12),
  minWidth: theme.spacing(12),
  textAlign: "right",
}));

export function StartTimeTableCell({
  startTime,
  paidHolidayFlag,
}: {
  startTime: Attendance["startTime"];
  paidHolidayFlag: Attendance["paidHolidayFlag"];
}) {
  const time = (() => {
    if (paidHolidayFlag) return "09:00";
    if (!startTime) return "";

    const date = dayjs(startTime);
    return date.format("H:mm");
  })();
  return <TableCell>{time}</TableCell>;
}
