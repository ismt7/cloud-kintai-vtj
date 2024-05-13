import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayUpdate,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { AttendanceEditInputs } from "../../../common";
import RestEndTimeInput from "./RestEndTimeInput";
import RestStartTimeInput from "./RestStartTimeInput";
import { Attendance } from "../../../../../API";

export function calcTotalRestTime(
  startTime: string | null | undefined,
  endTime: string | null | undefined
) {
  if (!startTime) return 0;

  const now = dayjs();
  const diff = dayjs(endTime || now).diff(dayjs(startTime), "hour", true);
  return diff;
}

export function RestTimeInput({
  targetWorkDate,
  rest,
  index,
  watch,
  remove,
  control,
  restUpdate,
}: {
  targetWorkDate: dayjs.Dayjs | null;
  rest: FieldArrayWithId<AttendanceEditInputs, "rests", "id">;
  index: number;
  watch: UseFormWatch<AttendanceEditInputs>;
  remove: (index?: number | number[] | undefined) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
  restUpdate: UseFieldArrayUpdate<AttendanceEditInputs, "rests">;
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
        <Box>
          <IconButton aria-label="staff-search" onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <RestStartTimeInput
          workDate={targetWorkDate}
          rest={rest}
          index={index}
          control={control}
          restUpdate={restUpdate}
        />
        <Box>
          <Typography variant="body1" sx={{ my: 1 }}>
            ～
          </Typography>
        </Box>
        <RestEndTimeInput
          workDate={targetWorkDate}
          rest={rest}
          index={index}
          control={control}
          restUpdate={restUpdate}
        />
        <Box sx={{ flexGrow: 1 }} textAlign={"right"}>
          {`${totalRestTime.toFixed(1)} 時間`}
        </Box>
      </Stack>
    </Box>
  );
}
