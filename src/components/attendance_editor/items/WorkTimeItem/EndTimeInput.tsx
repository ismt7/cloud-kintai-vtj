import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Box, Button, Chip, IconButton, Stack } from "@mui/material";
import { TimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { AttendanceEditorInputs } from "../../common";

export default function EndTimeInput({
  workDate,
  control,
  setValue,
  getValues,
  watch,
}: {
  workDate: dayjs.Dayjs | null;
  control: Control<AttendanceEditorInputs, any>;
  setValue: UseFormSetValue<AttendanceEditorInputs>;
  getValues: UseFormGetValues<AttendanceEditorInputs>;
  watch: UseFormWatch<AttendanceEditorInputs>;
}) {
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  useEffect(() => {
    const endTime = getValues("endTime");
    setEnableEndTime(!!endTime);

    watch((data) => {
      setEnableEndTime(!!data.endTime);
    });
  }, [watch]);

  if (!workDate) {
    return null;
  }

  return enableEndTime ? (
    <Stack direction="row" spacing={1}>
      <Stack spacing={1}>
        <Controller
          name="endTime"
          control={control}
          render={({ field }) => (
            <TimePicker
              value={dayjs(field.value)}
              ampm={false}
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
            label="18:00"
            color="success"
            variant="outlined"
            icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
            onClick={() => {
              const endTime = workDate
                .hour(18)
                .minute(0)
                .second(0)
                .millisecond(0)
                .toISOString();
              setValue("endTime", endTime);
            }}
          />
        </Box>
      </Stack>
      <Box>
        <IconButton
          sx={{ my: 1 }}
          onClick={() => {
            setValue("endTime", null);
            setEnableEndTime(false);
          }}
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </Stack>
  ) : (
    <Button
      variant="outlined"
      startIcon={<AddCircleOutlineIcon />}
      onClick={() => {
        setEnableEndTime(true);
      }}
      sx={{ my: 1.4 }}
    >
      終了時間を追加
    </Button>
  );
}
