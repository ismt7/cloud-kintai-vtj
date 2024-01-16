import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
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

export function calcTotalWorkTime(
  startTime: string | null | undefined,
  endTime: string | null | undefined
) {
  if (!startTime) return 0;

  const now = dayjs();
  const diff = dayjs(endTime || now).diff(dayjs(startTime), "hour", true);

  return diff;
}

export function WorkTimeItem({
  targetWorkDate,
  control,
  watch,
  setValue,
  getValues,
}: {
  targetWorkDate: dayjs.Dayjs | null;
  control: Control<AttendanceEditorInputs, any>;
  watch: UseFormWatch<AttendanceEditorInputs>;
  setValue: UseFormSetValue<AttendanceEditorInputs>;
  getValues: UseFormGetValues<AttendanceEditorInputs>;
}) {
  const [totalWorkTime, setTotalWorkTime] = useState<number>(0);
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  useEffect(() => {
    const endTime = getValues("endTime");
    if (endTime) {
      setEnableEndTime(true);
    }

    watch((data) => {
      const diff = calcTotalWorkTime(data.startTime, data.endTime);
      setTotalWorkTime(diff);
    });
  }, [watch]);

  if (!targetWorkDate) {
    return null;
  }

  return (
    <Stack
      direction="row"
      alignItems={"center"}
      sx={{ boxSizing: "border-box" }}
    >
      <Box sx={{ fontWeight: "bold", width: "150px" }}>勤務時間</Box>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Box sx={{ width: 33, height: 40 }} />
          <Box>
            <Stack direction="row" spacing={1} alignItems={"center"}>
              <Box>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      ampm={false}
                      value={dayjs(field.value)}
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                      }}
                      onChange={(value) => {
                        field.onChange(
                          value && value.isValid()
                            ? value
                                .year(targetWorkDate.year())
                                .month(targetWorkDate.month())
                                .date(targetWorkDate.date())
                                .second(0)
                                .millisecond(0)
                                .toISOString()
                            : null
                        );
                      }}
                    />
                  )}
                />
              </Box>
              <Box>～</Box>
              <Box>
                {enableEndTime ? (
                  <Stack direction="row" spacing={1} alignItems="center">
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
                                    .year(targetWorkDate.year())
                                    .month(targetWorkDate.month())
                                    .date(targetWorkDate.date())
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
              </Box>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1 }} textAlign={"right"}>
            <Typography variant="body1">
              {totalWorkTime.toFixed(1)}時間
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
