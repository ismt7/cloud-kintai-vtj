// cspell:ignore ampm
import { Box, Stack, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatchV2, useAppSelectorV2 } from "../../../app/hooks";
import {
  selectAttendanceEditor,
  updateAttendance,
} from "../attendanceEditorSlice";

export default function WorkTimeItem() {
  const dispatch = useAppDispatchV2();
  const { attendance } = useAppSelectorV2(selectAttendanceEditor);

  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [totalTime, setTotalTime] = useState<string>("0.0");

  useEffect(() => {
    if (!attendance) return;

    const attendanceStartTime = dayjs(attendance.startTime);
    setStartTime(attendanceStartTime);

    const attendanceEndTime = dayjs(attendance.endTime);
    setEndTime(attendanceEndTime);

    // 合計時間を計算
    if (!attendanceStartTime || !attendanceEndTime) return;

    const diff = attendanceEndTime.diff(attendanceStartTime, "hour", true);
    setTotalTime(diff.toFixed(1));
  }, [attendance]);

  const handleStartTimeChange = (newStartTime: dayjs.Dayjs | null) => {
    if (!newStartTime || !attendance) return;

    setStartTime(newStartTime);

    void dispatch(
      updateAttendance({
        ...attendance,
        startTime: newStartTime.toISOString(),
      })
    );

    // 合計時間を計算
    if (!endTime) return;
    const diff = endTime.diff(newStartTime, "hour", true);
    setTotalTime(diff.toFixed(1));
  };

  const handleEndTimeChange = (newEndTime: dayjs.Dayjs | null) => {
    if (!newEndTime || !attendance) return;

    setEndTime(newEndTime);

    void dispatch(
      updateAttendance({
        ...attendance,
        endTime: newEndTime.toISOString(),
      })
    );

    // 合計時間を計算
    if (!startTime) return;

    const diff = newEndTime.diff(startTime, "hour", true);
    setTotalTime(diff.toFixed(1));
  };

  return (
    <Stack
      direction="row"
      alignItems={"center"}
      sx={{ boxSizing: "border-box" }}
    >
      <Box sx={{ fontWeight: "bold", width: "150px" }}>勤務時間</Box>
      <Box sx={{ flexGrow: 2 }}>
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Box>
            <Stack direction="row" spacing={1} alignItems={"center"}>
              <Box>
                <TimePicker
                  label="開始時刻"
                  ampm={false}
                  value={startTime}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                  }}
                  onChange={handleStartTimeChange}
                />
              </Box>
              <Box>～</Box>
              <Box>
                <TimePicker
                  label="終了時刻"
                  ampm={false}
                  value={endTime}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                  }}
                  onChange={handleEndTimeChange}
                />
              </Box>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 2 }} textAlign={"right"}>
            <Typography variant="body1">{totalTime}時間</Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
