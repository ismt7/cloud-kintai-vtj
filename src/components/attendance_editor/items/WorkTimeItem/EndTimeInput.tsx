import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Chip, IconButton, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import { AttendanceEditContext } from "@/pages/AttendanceEdit/AttendanceEditProvider";
import { AppConfigContext } from "@/context/AppConfigContext";
import TimeInputBase from "./TimeInputBase";
import { AttendanceEditInputs } from "@/pages/AttendanceEdit/common";

export default function EndTimeInput() {
  const { getQuickInputEndTimes } = useContext(AppConfigContext);
  const { workDate, control, setValue } = useContext(AttendanceEditContext);
  if (!workDate) return null;

  const [quickInputEndTimes, setQuickInputEndTimes] = useState<
    { time: string; enabled: boolean }[]
  >([]);

  useEffect(() => {
    const quickInputEndTimes = getQuickInputEndTimes(true);
    setQuickInputEndTimes(
      quickInputEndTimes.map((entry) => ({
        time: entry.time,
        enabled: entry.enabled,
      }))
    );
  }, [getQuickInputEndTimes]);

  if (!control || !setValue) {
    return null;
  }

  return (
    <TimeInputBase<"endTime">
      name="endTime"
      control={control}
      setValue={setValue}
      workDate={workDate}
      quickInputTimes={quickInputEndTimes}
      chipColor={(enabled) => (enabled ? "success" : "default")}
    />
  );
}
