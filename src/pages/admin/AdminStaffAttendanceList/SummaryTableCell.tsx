import { TableCell } from "@mui/material";

import { Attendance } from "../../../API";

export function SummaryTableCell({
  paidHolidayFlag,
  remarks,
}: {
  paidHolidayFlag: Attendance["paidHolidayFlag"];
  remarks: Attendance["remarks"];
}) {
  const summaryText = (() => {
    const summaryMessage = [];
    if (paidHolidayFlag) summaryMessage.push("有給休暇");
    if (remarks) summaryMessage.push(remarks);

    return summaryMessage.join(" ");
  })();

  return <TableCell sx={{ whiteSpace: "nowrap" }}>{summaryText}</TableCell>;
}
