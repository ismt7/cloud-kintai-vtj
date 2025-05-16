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

export default function EndTimeInput() {
  const { getQuickInputEndTimes } = useContext(AppConfigContext);
  const { workDate, control, setValue, getValues, watch } = useContext(
    AttendanceEditContext
  );
  if (!workDate) return null;

  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);
  const [quickInputStartTimes, setQuickInputStartTimes] = useState<
    { time: string; enabled: boolean }[]
  >([]);

  useEffect(() => {
    const quickInputEndTimes = getQuickInputEndTimes(true);
    if (quickInputEndTimes.length > 0) {
      setQuickInputStartTimes(
        quickInputEndTimes.map((entry) => ({
          time: entry.time,
          enabled: entry.enabled,
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (!watch || !getValues) return;

    const endTime = getValues("endTime");
    setEnableEndTime(!!endTime);

    watch((data) => {
      setEnableEndTime(!!data.endTime);
    });
  }, [watch]);

  if (!enableEndTime) {
    return (
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => {
          setEnableEndTime(true);
        }}
      >
        終了時間を追加
      </Button>
    );
  }

  if (!control || !setValue) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1}>
      <Stack spacing={1}>
        <Controller
          name="endTime"
          control={control}
          render={({ field }) => (
            <TimePicker
              value={(() => (field.value ? dayjs(field.value) : null))()}
              ampm={false}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              slotProps={{
                textField: { size: "small" },
              }}
              onChange={(value) => {
                field.onChange(
                  value && value.isValid()
                    ? value
                        .year(workDate.year())
                        .month(workDate.month())
                        .date(workDate.date())
                        .second(0)
                        .millisecond(0)
                        .toISOString()
                    : null
                );
              }}
            />
          )}
        />
        <Box>
          {quickInputStartTimes.map((entry, index) => (
            <Chip
              key={index}
              label={entry.time}
              color={entry.enabled ? "success" : "default"}
              variant="outlined"
              icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
              onClick={() => {
                const startTime = dayjs(
                  `${workDate.format("YYYY-MM-DD")} ${entry.time}`
                ).toISOString();
                setValue("endTime", startTime);
              }}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
      </Stack>
      <Box>
        <IconButton
          onClick={() => {
            setValue("endTime", null);
            setEnableEndTime(false);
          }}
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </Stack>
  );
}
