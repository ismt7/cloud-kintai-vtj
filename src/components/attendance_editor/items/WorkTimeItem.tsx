// cspell:ignore ampm
import { Box, Stack, Typography } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Attendance } from "../../../client";

export default function WorkTimeItem({
  attendance,
  callback,
}: {
  attendance: Attendance | null;
  callback: (value: {
    startTime: dayjs.Dayjs;
    endTime: dayjs.Dayjs;
    totalTime: number;
  }) => void;
}) {
  if (!attendance) return <></>;

  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [totalWorkTime, setTotalWorkTime] = useState<string>("0.0");

  useEffect(() => {
    const attendanceStartTime = dayjs(attendance.start_time);
    setStartTime(attendanceStartTime);
  }, [attendance.start_time]);

  useEffect(() => {
    const attendanceEndTime = dayjs(attendance.end_time);
    setEndTime(attendanceEndTime);
  }, [attendance.end_time]);

  useEffect(() => {
    if (!startTime || !endTime) return;
    if (!startTime.isValid() || !endTime.isValid()) return;

    const diff = endTime.diff(startTime, "hour", true);
    setTotalWorkTime(diff.toFixed(1));
    callback({ startTime, endTime, totalTime: diff });
  }, [startTime, endTime]);

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
                <TimePicker
                  ampm={false}
                  value={startTime}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                  }}
                  onChange={(value) => {
                    setStartTime(value);
                  }}
                />
              </Box>
              <Box>～</Box>
              <Box>
                <TimePicker
                  ampm={false}
                  value={endTime}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                  }}
                  onChange={(value) => {
                    setEndTime(value);
                  }}
                />
              </Box>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1 }} textAlign={"right"}>
            <Typography variant="body1">{totalWorkTime}時間</Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
