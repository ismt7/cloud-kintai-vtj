import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Chip, IconButton, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

import { AttendanceEditInputs } from "../../common";
import { Attendance } from "../../../../API";

export default function EndTimeInput({
  workDate,
  attendance,
  control,
  setValue,
}: {
  workDate: dayjs.Dayjs | null;
  attendance: Attendance | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
  setValue: UseFormSetValue<AttendanceEditInputs>;
}) {
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  if (!workDate) return null;

  useEffect(() => {
    if (!attendance) return;

    const endTime = attendance.endTime;
    setEnableEndTime(!!endTime);
  }, [workDate]);

  useEffect(() => {
    if (!attendance) return;
    setEnableEndTime(!!attendance.endTime);
  }, [attendance]);

  const endTime = attendance?.endTime ? dayjs(attendance.endTime) : null;

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
              value={endTime}
              ampm={false}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              slotProps={{
                textField: { size: "small" },
              }}
              onChange={(value) => {
                if (!value) return null;
                if (!value.isValid()) return;

                const formattedEndTime = value
                  .year(workDate.year())
                  .month(workDate.month())
                  .date(workDate.date())
                  .second(0)
                  .millisecond(0)
                  .toISOString();
                field.onChange(formattedEndTime);
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
