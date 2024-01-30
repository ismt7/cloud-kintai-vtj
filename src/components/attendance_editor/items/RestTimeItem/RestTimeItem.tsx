import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { AttendanceEditorInputs } from "../../common";
import RestStartTimeInput from "./RestStartTimeInput";
import RestEndTimeInput from "./RestEndTimeInput";

export function calcTotalRestTime(
  startTime: string | null | undefined,
  endTime: string | null | undefined
) {
  if (!startTime) return 0;

  const now = dayjs();
  const diff = dayjs(endTime || now).diff(dayjs(startTime), "hour", true);
  return diff;
}

export function RestTimeItem({
  targetWorkDate,
  index,
  watch,
  remove,
  control,
  setValue,
  getValues,
}: {
  targetWorkDate: dayjs.Dayjs | null;
  index: number;
  watch: UseFormWatch<AttendanceEditorInputs>;
  remove: (index?: number | number[] | undefined) => void;
  control: Control<AttendanceEditorInputs, any>;
  setValue: UseFormSetValue<AttendanceEditorInputs>;
  getValues: UseFormGetValues<AttendanceEditorInputs>;
}) {
  const [totalRestTime, setTotalRestTime] = useState<number>(0);

  useEffect(() => {
    watch((data) => {
      if (!data.rests) return;

      const rest = data.rests[index];
      if (!rest) return;

      const diff = calcTotalRestTime(rest.startTime, rest.endTime);
      setTotalRestTime(diff);
    });
  }, [watch]);

  if (!targetWorkDate) {
    return null;
  }

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Box sx={{ py: 1 }}>
          <IconButton aria-label="staff-search" onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <RestStartTimeInput
          index={index}
          workDate={dayjs(targetWorkDate)}
          control={control}
          setValue={setValue}
        />
        <Box>
          <Typography variant="body1" sx={{ my: 2 }}>
            ～
          </Typography>
        </Box>
        <RestEndTimeInput
          index={index}
          workDate={targetWorkDate}
          control={control}
          setValue={setValue}
          getValues={getValues}
          watch={watch}
        />
        <Box sx={{ flexGrow: 1 }} textAlign={"right"}>
          {`${totalRestTime.toFixed(1)} 時間`}
        </Box>
      </Stack>
    </Box>
  );
}
