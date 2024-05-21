import { TableCell } from "@mui/material";

import { Attendance } from "../../../API";

export function SummaryTableCell({
  paidHolidayFlag,
  remarks,
}: {
  paidHolidayFlag: Attendance["paidHolidayFlag"];
  remarks: Attendance["remarks"];
}) {
  return (
    <TableCell sx={{ whiteSpace: "nowrap" }}>
      {getSummaryText(paidHolidayFlag, remarks)}
    </TableCell>
  );
}

function getSummaryText(
  paidHolidayFlag: boolean | null | undefined,
  remarks: string | null | undefined
) {
  return (() => {
    const summaryMessage = [];
    if (paidHolidayFlag) summaryMessage.push("有給休暇");
    if (remarks) summaryMessage.push(remarks);

    return summaryMessage.join(" ");
  })();
}
