import { Box, Stack, Typography } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Control, Controller, UseFormWatch } from "react-hook-form";

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
}: {
  targetWorkDate: dayjs.Dayjs;
  control: Control<AttendanceEditorInputs, any>;
  watch: UseFormWatch<AttendanceEditorInputs>;
}) {
  const [totalWorkTime, setTotalWorkTime] = useState<number>(0);

  useEffect(() => {
    watch((data) => {
      const diff = calcTotalWorkTime(data.startTime, data.endTime);
      setTotalWorkTime(diff);
    });
  }, [watch]);

  return (
    <Stack
      direction="row"
      alignItems={"center"}
      sx={{ boxSizing: "border-box" }}
    >
      <Box sx={{ fontWeight: "bold", width: "150px" }}>勤務時間</Box>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={2} alignItems={"center"}>
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
                                .toISOString()
                            : null
                        );
                      }}
                    />
                  )}
                />
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
