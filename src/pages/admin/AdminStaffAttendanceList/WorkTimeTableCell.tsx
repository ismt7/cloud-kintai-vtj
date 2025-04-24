import { TableCell } from "@mui/material";
import dayjs from "dayjs";

import { Attendance } from "@/API";
import useAppConfig from "@/hooks/useAppConfig/useAppConfig";
import { useEffect, useState } from "react";

export function WorkTimeTableCell({ attendance }: { attendance: Attendance }) {
  const { fetchConfig, getStartTime, getEndTime, loading } = useAppConfig();
  const [defaultStartTime, setDefaultStartTime] = useState<string>("9:00");
  const [defaultEndTime, setDefaultEndTime] = useState<string>("18:00");

  useEffect(() => {
    fetchConfig();
  }, []);

  useEffect(() => {
    if (!loading) {
      setDefaultStartTime(getStartTime()?.format("H:mm") || "9:00");
      setDefaultEndTime(getEndTime()?.format("H:mm") || "18:00");
    }
  }, [loading]);

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

  if (loading || (!formattedStartTime && !formattedEndTime)) {
    return <TableCell />;
  }

  return (
    <TableCell sx={{ whiteSpace: "nowrap" }}>
      {formattedStartTime} 〜 {formattedEndTime}
      {displayGoReturnDirectly}
    </TableCell>
  );
}
