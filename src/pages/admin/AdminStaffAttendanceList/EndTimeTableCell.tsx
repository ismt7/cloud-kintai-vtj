import { TableCell as MuiTableCell, styled } from "@mui/material";
import dayjs from "dayjs";
import { Attendance } from "../../../API";

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  width: theme.spacing(12),
  minWidth: theme.spacing(12),
  textAlign: "right",
}));

export function EndTimeTableCell({
  endTime,
  paidHolidayFlag,
}: {
  endTime: Attendance["endTime"];
  paidHolidayFlag: Attendance["paidHolidayFlag"];
}) {
  const time = (() => {
    if (paidHolidayFlag) return "18:00";
    if (!endTime) return "";

    const date = dayjs(endTime);
    return date.format("H:mm");
  })();
  return <TableCell>{time}</TableCell>;
}
