import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Chip, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  Control,
  Controller,
  FieldArrayWithId,
  UseFieldArrayUpdate,
} from "react-hook-form";

import { AttendanceEditorInputs } from "../../common";

type RestStartTimeInputProps = {
  index: number;
  workDate: dayjs.Dayjs;
  rest: FieldArrayWithId<AttendanceEditorInputs, "rests", "id">;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditorInputs, any>;
  restUpdate: UseFieldArrayUpdate<AttendanceEditorInputs, "rests">;
};

export default function RestStartTimeInput({
  index,
  workDate,
  rest,
  control,
  restUpdate,
}: RestStartTimeInputProps) {
  return (
    <Stack spacing={1}>
      <Controller
        name={`rests.${index}.startTime`}
        control={control}
        render={({ field }) => (
          <TimePicker
            value={rest.startTime ? dayjs(rest.startTime) : null}
            ampm={false}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
            }}
            slotProps={{
              textField: { size: "small" },
            }}
            onChange={(newStartTime) => {
              if (!newStartTime) return field.onChange(null);
              if (!newStartTime.isValid()) return;

              const formattedStartTime = newStartTime
                .year(workDate.year())
                .month(workDate.month())
                .date(workDate.date())
                .second(0)
                .millisecond(0)
                .toISOString();
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
            restUpdate(index, { ...rest, startTime });
          }}
        />
      </Box>
    </Stack>
  );
}
