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
import { RestInput } from "../../../API";
import { AttendanceEditorInputs } from "../common";

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
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);
  const [restStartTime, setRestStartTime] =
    useState<RestInput["startTime"]>(undefined);
  const [restEndTime, setRestEndTime] =
    useState<RestInput["endTime"]>(undefined);

  useEffect(() => {
    const startTime = getValues(`rests.${index}.startTime`);
    setRestStartTime(startTime);
    const endTime = getValues(`rests.${index}.endTime`);
    setRestEndTime(endTime);

    setEnableEndTime(!!endTime);

    watch((data) => {
      if (!data.rests) return;

      const rest = data.rests[index];
      if (!rest) return;

      setRestStartTime(rest.startTime);
      setRestEndTime(rest.endTime);

      setEnableEndTime(!!rest.endTime);

      const diff = calcTotalRestTime(rest.startTime, rest.endTime);
      setTotalRestTime(diff);
    });
  }, [watch]);

  if (!targetWorkDate) {
    return null;
  }

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
              value={dayjs(restStartTime)}
              ampm={false}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              onChange={(newStartTime) => {
                const formattedStartTime = newStartTime
                  ? newStartTime
                      .year(targetWorkDate.year())
                      .month(targetWorkDate.month())
                      .date(targetWorkDate.date())
                      .second(0)
                      .millisecond(0)
                      .toISOString()
                  : null;
                setRestStartTime(formattedStartTime);
                field.onChange(formattedStartTime);
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
                  value={dayjs(restEndTime)}
                  ampm={false}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                  }}
                  onChange={(newEndTime) => {
                    const formattedEndTime = newEndTime
                      ? newEndTime
                          .year(targetWorkDate.year())
                          .month(targetWorkDate.month())
                          .date(targetWorkDate.date())
                          .second(0)
                          .millisecond(0)
                          .toISOString()
                      : null;
                    setRestEndTime(formattedEndTime);
                    field.onChange(formattedEndTime);
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
