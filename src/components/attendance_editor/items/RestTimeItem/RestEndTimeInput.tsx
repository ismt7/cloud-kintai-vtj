import { Box, Button, Chip, IconButton, Stack } from "@mui/material";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { TimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AttendanceEditorInputs } from "../../common";

export default function RestEndTimeInput({
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
              value={field.value ? dayjs(field.value) : null}
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
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </Stack>
  );
}
