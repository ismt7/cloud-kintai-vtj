import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Chip, IconButton, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import { Logger } from "aws-amplify";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { AttendanceEditorInputs } from "../../common";

export default function EndTimeInput({
  workDate,
  control,
  setValue,
  getValues,
  watch,
}: {
  workDate: dayjs.Dayjs | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditorInputs, any>;
  setValue: UseFormSetValue<AttendanceEditorInputs>;
  getValues: UseFormGetValues<AttendanceEditorInputs>;
  watch: UseFormWatch<AttendanceEditorInputs>;
}) {
  if (!workDate) return null;

  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  useEffect(() => {
    const endTime = getValues("endTime");
    setEnableEndTime(!!endTime);

    watch((data) => {
      setEnableEndTime(!!data.endTime);
    });
  }, [watch]);

  const logger = new Logger(
    "EndTimeInput",
    import.meta.env.DEV ? "DEBUG" : "ERROR"
  );

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

  return (
    <Stack direction="row" spacing={1}>
      <Stack spacing={1}>
        <Controller
          name="endTime"
          control={control}
          render={({ field }) => (
            <TimePicker
              value={(() => {
                logger.debug(
                  "endTime:",
                  field.value
                    ? dayjs(field.value).format("YYYY/MM/DD HH:mm:ss")
                    : field.value
                );
                return field.value ? dayjs(field.value) : null;
              })()}
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
  );
}
