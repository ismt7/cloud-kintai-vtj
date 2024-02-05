import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Chip, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

import { AttendanceEditInputs } from "../common";

export default function StartTimeInput({
  workDate,
  control,
  setValue,
}: {
  workDate: dayjs.Dayjs | null;
  control: Control<AttendanceEditInputs, any>;
  setValue: UseFormSetValue<AttendanceEditInputs>;
}) {
  if (!workDate) {
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
            value={field.value ? dayjs(field.value) : null}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
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
        <Chip
          label="09:00"
          color="success"
          variant="outlined"
          icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
          onClick={() => {
            const startTime = workDate
              .hour(9)
              .minute(0)
              .second(0)
              .millisecond(0)
              .toISOString();
            setValue("startTime", startTime);
          }}
        />
      </Box>
    </Stack>
  );
}
