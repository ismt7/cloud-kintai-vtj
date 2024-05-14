import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Chip, IconButton, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldArrayWithId,
  UseFieldArrayUpdate,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { AttendanceEditorInputs } from "../../common";

type RestEndTimeInputProps = {
  index: number;
  workDate: dayjs.Dayjs;
  rest: FieldArrayWithId<AttendanceEditorInputs, "rests", "id">;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditorInputs, any>;
  watch: UseFormWatch<AttendanceEditorInputs>;
  getValues: UseFormGetValues<AttendanceEditorInputs>;
  restUpdate: UseFieldArrayUpdate<AttendanceEditorInputs, "rests">;
};

export default function RestEndTimeInput({
  index,
  workDate,
  rest,
  control,
  watch,
  getValues,
  restUpdate,
}: RestEndTimeInputProps) {
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  useEffect(() => {
    const rest = getValues(`rests.${index}`);
    if (!rest) return;
    setEnableEndTime(!!rest.endTime);

    watch((data) => {
      if (!data.rests) return;

      const dataRest = data.rests[index];
      if (!dataRest) return;
      setEnableEndTime(!!dataRest.endTime);
    });
  }, [watch]);

  if (!enableEndTime) {
    return (
      <Box>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            setEnableEndTime(true);
          }}
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
              value={rest.endTime ? dayjs(rest.endTime) : null}
              ampm={false}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              slotProps={{
                textField: { size: "small" },
              }}
              onChange={(newEndTime) => {
                if (!newEndTime) return field.onChange(null);
                if (!newEndTime.isValid()) return;

                const formattedEndTime = newEndTime
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
              restUpdate(index, { ...rest, endTime });
            }}
          />
        </Box>
      </Stack>
      <Box>
        <IconButton
          onClick={() => {
            restUpdate(index, { ...rest, endTime: null });
            setEnableEndTime(false);
          }}
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </Stack>
  );
}
