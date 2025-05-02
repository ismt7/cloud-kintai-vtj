import { TableCell } from "@mui/material";
import dayjs from "dayjs";

import { Attendance } from "@/API";
import { useContext, useEffect, useState } from "react";
import { AppConfigContext } from "@/context/AppConfigContext";

export function WorkTimeTableCell({ attendance }: { attendance: Attendance }) {
  const { getStartTime, getEndTime } = useContext(AppConfigContext);
  const [defaultStartTime, setDefaultStartTime] = useState<string>("9:00");
  const [defaultEndTime, setDefaultEndTime] = useState<string>("18:00");

  useEffect(() => {
    setDefaultStartTime(getStartTime()?.format("H:mm") || "9:00");
    setDefaultEndTime(getEndTime()?.format("H:mm") || "18:00");
  }, [getStartTime, getEndTime]);

  const { paidHolidayFlag, startTime, endTime } = attendance;

  const formattedStartTime = (() => {
    if (paidHolidayFlag) return defaultStartTime;
    if (!startTime) return "";

    const date = dayjs(startTime);
    return date.format("H:mm");
  })();

  const formattedEndTime = (() => {
    if (paidHolidayFlag) return defaultEndTime;
    if (!endTime) return "";

    const date = dayjs(endTime);
    return date.format("H:mm");
  })();

  // 直行/直帰
  const goDirectlyFlag = attendance.goDirectlyFlag ? "直行" : "";
  const returnDirectlyFlag = attendance.returnDirectlyFlag ? "直帰" : "";
  const displayGoReturnDirectly =
    goDirectlyFlag || returnDirectlyFlag
      ? `(${goDirectlyFlag}${returnDirectlyFlag})`
      : "";

  if (!formattedStartTime && !formattedEndTime) {
    return <TableCell />;
  }

  return (
    <TableCell sx={{ whiteSpace: "nowrap" }}>
      {formattedStartTime} 〜 {formattedEndTime}
      {displayGoReturnDirectly}
    </TableCell>
  );
}
