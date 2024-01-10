import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
// TODO: あとで修正
// eslint-disable-next-line import/no-cycle
import { AttendanceEditorInputs } from "../AttendanceEditor";

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
  targetWorkDate: dayjs.Dayjs;
  index: number;
  watch: UseFormWatch<AttendanceEditorInputs>;
  remove: (index?: number | number[] | undefined) => void;
  control: Control<AttendanceEditorInputs, any>;
  setValue: UseFormSetValue<AttendanceEditorInputs>;
  getValues: UseFormGetValues<AttendanceEditorInputs>;
}) {
  const [totalRestTime, setTotalRestTime] = useState<number>(0);
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  useEffect(() => {
    const endTime = getValues(`rests.${index}.endTime`);
    if (endTime) {
      setEnableEndTime(true);
    }

    watch((data) => {
      if (!data.rests) return;

      const rest = data.rests[index];
      if (!rest) return;

      const diff = calcTotalRestTime(rest.startTime, rest.endTime);
      setTotalRestTime(diff);
    });
  }, [watch]);

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems={"center"}>
        <Box>
          <IconButton aria-label="staff-search" onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Controller
          name={`rests.${index}.startTime`}
          control={control}
          render={({ field }) => (
            <TimePicker
              value={dayjs(field.value)}
              ampm={false}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              onChange={(newStartTime) => {
                field.onChange(
                  newStartTime
                    ? newStartTime
                        .year(targetWorkDate.year())
                        .month(targetWorkDate.month())
                        .date(targetWorkDate.date())
                        .toISOString()
                    : null
                );
              }}
            />
          )}
        />
        <Box>～</Box>
        {enableEndTime ? (
          <Stack direction="row" spacing={1} alignItems="center">
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
                    field.onChange(
                      newEndTime
                        ? newEndTime
                            .year(targetWorkDate.year())
                            .month(targetWorkDate.month())
                            .date(targetWorkDate.date())
                            .toISOString()
                        : null
                    );
                  }}
                />
              )}
            />
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
        ) : (
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => {
              setEnableEndTime(true);
            }}
          >
            終了時間を追加
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }} textAlign={"right"}>
          {`${totalRestTime.toFixed(1)} 時間`}
        </Box>
      </Stack>
    </Box>
  );
}
