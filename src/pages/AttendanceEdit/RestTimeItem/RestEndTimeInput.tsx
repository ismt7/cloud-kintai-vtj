import { Box, Button, Chip, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { TimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs from "dayjs";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { AttendanceEditInputs } from "../common";

export default function RestEndTimeInput({
  workDate,
  index,
  control,
  setValue,
}: {
  workDate: dayjs.Dayjs;
  index: number;
  control: Control<AttendanceEditInputs, any>;
  setValue: UseFormSetValue<AttendanceEditInputs>;
}) {
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  if (!enableEndTime) {
    return (
      <Box>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            setEnableEndTime(true);
          }}
          sx={{ my: 1.2 }}
        >
          終了時間を追加
        </Button>
      </Box>
    );
  }

  return (
    <Stack direction="row" spacing={1}>
      <Stack spacing={1}>
        <Controller
          name={`rests.${index}.endTime`}
          control={control}
          render={({ field }) => (
            <TimePicker
              value={dayjs(field.value)}
              ampm={false}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              onChange={(newEndTime) => {
                const formattedEndTime = newEndTime
                  ? newEndTime
                      .year(workDate.year())
                      .month(workDate.month())
                      .date(workDate.date())
                      .second(0)
                      .millisecond(0)
                      .toISOString()
                  : null;
                field.onChange(formattedEndTime);
              }}
            />
          )}
        />
        <Box>
          <Chip
            label="13:00"
            variant="outlined"
            color="success"
            icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
            onClick={() => {
              const endTime = workDate
                .hour(13)
                .minute(0)
                .second(0)
                .millisecond(0)
                .toISOString();
              setValue(`rests.${index}.endTime`, endTime);
            }}
          />
        </Box>
      </Stack>
      <Box>
        <IconButton
          onClick={() => {
            setValue(`rests.${index}.endTime`, null);
            setEnableEndTime(false);
          }}
          sx={{ my: 1.2 }}
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </Stack>
  );
}
