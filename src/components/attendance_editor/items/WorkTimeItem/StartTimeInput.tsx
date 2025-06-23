import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Chip, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import { AttendanceEditContext } from "@/pages/AttendanceEdit/AttendanceEditProvider";
import useAppConfig from "@/hooks/useAppConfig/useAppConfig";
import { AppConfigContext } from "@/context/AppConfigContext";
import TimeInputBase from "./TimeInputBase";
import { AttendanceEditInputs } from "@/pages/AttendanceEdit/common";

export default function StartTimeInput() {
  const { workDate, control, setValue } = useContext(AttendanceEditContext);
  const { getQuickInputStartTimes } = useContext(AppConfigContext);
  const [quickInputStartTimes, setQuickInputStartTimes] = useState<
    { time: string; enabled: boolean }[]
  >([]);

  useEffect(() => {
    const quickInputStartTimes = getQuickInputStartTimes(true);
    setQuickInputStartTimes(
      quickInputStartTimes.map((entry) => ({
        time: entry.time,
        enabled: entry.enabled,
      }))
    );
  }, [getQuickInputStartTimes]);

  if (!workDate || !control || !setValue) {
    return null;
  }

  return (
    <TimeInputBase<"startTime">
      name="startTime"
      control={control}
      setValue={setValue}
      workDate={workDate}
      quickInputTimes={quickInputStartTimes}
      chipColor={() => "success"}
    />
  );
}
