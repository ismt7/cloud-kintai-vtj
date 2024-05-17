import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayUpdate,
  UseFormGetValues,
  UseFormWatch,
} from "react-hook-form";

import { AttendanceEditorInputs } from "../../common";
import RestEndTimeInput from "./RestEndTimeInput";
import RestStartTimeInput from "./RestStartTimeInput";

export function calcTotalRestTime(
  startTime: string | null | undefined,
  endTime: string | null | undefined
) {
  if (!startTime) return 0;

  const now = dayjs();
  const diff = dayjs(endTime || now).diff(dayjs(startTime), "hour", true);
  return diff;
}

type RestTimeItemProps = {
  targetWorkDate: dayjs.Dayjs | null;
  rest: FieldArrayWithId<AttendanceEditorInputs, "rests", "id">;
  index: number;
  watch: UseFormWatch<AttendanceEditorInputs>;
  restRemove: (index?: number | number[] | undefined) => void;
  restUpdate: UseFieldArrayUpdate<AttendanceEditorInputs, "rests">;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditorInputs, any>;
  getValues: UseFormGetValues<AttendanceEditorInputs>;
};

export function RestTimeItem({
  targetWorkDate,
  rest,
  index,
  watch,
  restRemove,
  restUpdate,
  control,
  getValues,
}: RestTimeItemProps) {
  const [totalRestTime, setTotalRestTime] = useState<number>(0);

  if (!targetWorkDate) {
    return null;
  }

  useEffect(() => {
    const diff = calcTotalRestTime(rest.startTime, rest.endTime);
    setTotalRestTime(diff);
  }, [rest]);

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Box>
          <IconButton
            aria-label="staff-search"
            onClick={() => restRemove(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <RestStartTimeInput
          index={index}
          workDate={dayjs(targetWorkDate)}
          rest={rest}
          control={control}
          restUpdate={restUpdate}
        />
        <Box>
          <Typography variant="body1" sx={{ my: 1 }}>
            ～
          </Typography>
        </Box>
        <RestEndTimeInput
          index={index}
          workDate={targetWorkDate}
          rest={rest}
          control={control}
          getValues={getValues}
          watch={watch}
          restUpdate={restUpdate}
        />
        <Box sx={{ flexGrow: 1 }} textAlign={"right"}>
          {`${totalRestTime.toFixed(1)} 時間`}
        </Box>
      </Stack>
    </Box>
  );
}
