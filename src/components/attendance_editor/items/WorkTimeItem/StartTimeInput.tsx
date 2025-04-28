import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Chip, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import { AttendanceEditContext } from "@/pages/AttendanceEdit/AttendanceEditProvider";
import useAppConfig from "@/hooks/useAppConfig/useAppConfig";

export default function StartTimeInput() {
  const { workDate, control, setValue } = useContext(AttendanceEditContext);
  const { fetchConfig, getQuickInputStartTimes, loading } = useAppConfig();
  const [quickInputStartTimes, setQuickInputStartTimes] = useState<
    { time: string; enabled: boolean }[]
  >([]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  useEffect(() => {
    if (!loading) {
      const quickInputStartTimes = getQuickInputStartTimes(true);
      setQuickInputStartTimes(
        quickInputStartTimes.map((entry) => ({
          time: entry.time,
          enabled: entry.enabled,
        }))
      );
    }
  }, [loading]);

  if (!workDate || !control || !setValue) {
    return null;
  }

  return (
    <Stack spacing={1}>
      <Controller
        name="startTime"
        control={control}
        render={({ field }) => (
          <TimePicker
            ampm={false}
            value={(() => (field.value ? dayjs(field.value) : null))()}
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
        <Stack direction="row" spacing={1}>
          {quickInputStartTimes.map((entry, index) => (
            <Chip
              key={index}
              label={entry.time}
              color="success"
              variant="outlined"
              icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
              onClick={() => {
                const startTime = dayjs(
                  `${workDate.format("YYYY-MM-DD")} ${entry.time}`
                ).toISOString();
                setValue("startTime", startTime);
              }}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
