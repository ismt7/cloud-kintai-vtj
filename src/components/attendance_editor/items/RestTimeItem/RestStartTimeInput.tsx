import { Box, Chip, Stack } from "@mui/material";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { TimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { AttendanceEditorInputs } from "../../common";

export default function RestStartTimeInput({
  index,
  workDate,
  control,
  setValue,
}: {
  index: number;
  workDate: dayjs.Dayjs;
  control: Control<AttendanceEditorInputs, any>;
  setValue: UseFormSetValue<AttendanceEditorInputs>;
}) {
  return (
    <Stack spacing={1}>
      <Controller
        name={`rests.${index}.startTime`}
        control={control}
        render={({ field }) => (
          <TimePicker
            value={field.value ? dayjs(field.value) : null}
            ampm={false}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
            }}
            onChange={(newStartTime) => {
              const formattedStartTime = newStartTime
                ? newStartTime
                    .year(workDate.year())
                    .month(workDate.month())
                    .date(workDate.date())
                    .second(0)
                    .millisecond(0)
                    .toISOString()
                : null;
              field.onChange(formattedStartTime);
            }}
          />
        )}
      />
      <Box>
        <Chip
          label="12:00"
          variant="outlined"
          color="success"
          icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
          onClick={() => {
            const startTime = workDate
              .hour(12)
              .minute(0)
              .second(0)
              .millisecond(0)
              .toISOString();
            setValue(`rests.${index}.startTime`, startTime);
          }}
        />
      </Box>
    </Stack>
  );
}
