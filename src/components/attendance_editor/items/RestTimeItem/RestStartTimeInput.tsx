import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Chip, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext } from "react";
import { Controller, FieldArrayWithId } from "react-hook-form";

import { AttendanceEditContext } from "@/pages/AttendanceEdit/AttendanceEditProvider";
import { AttendanceEditInputs } from "@/pages/AttendanceEdit/common";
import { AppConfigContext } from "@/context/AppConfigContext";

export default function RestStartTimeInput({
  index,
  rest,
}: {
  index: number;
  rest: FieldArrayWithId<AttendanceEditInputs, "rests", "id">;
}) {
  const { workDate, control, restUpdate } = useContext(AttendanceEditContext);
  const { getLunchRestStartTime } = useContext(AppConfigContext);

  if (!workDate || !control || !restUpdate) {
    return null;
  }

  const lunchRestStartTime = getLunchRestStartTime().format("HH:mm");

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
          label={lunchRestStartTime}
          variant="outlined"
          color="success"
          icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
          onClick={() => {
            const startTime = dayjs(
              `${workDate.format("YYYY-MM-DD")} ${lunchRestStartTime}`
            )
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
