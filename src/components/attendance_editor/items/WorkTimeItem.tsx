// cspell:ignore ampm
import { Box, Stack, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatchV2, useAppSelectorV2 } from "../../../app/hooks";
import {
  fetchAttendance,
  selectAttendanceEditor,
} from "../attendanceEditorSlice";

export default function WorkTimeItem() {
  const dispatch = useAppDispatchV2();
  const attendanceEditorData = useAppSelectorV2(selectAttendanceEditor);
  const { attendance } = attendanceEditorData;

  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [totalTime, setTotalTime] = useState<string>("0");

  useEffect(() => {
    void dispatch(
      fetchAttendance({
        staffId: 999,
        workDate: Number(dayjs().format("YYYYMMDD")),
      })
    );
  }, []);

  useEffect(() => {
    if (!attendance) {
      return;
    }

    const attendanceStartTime = dayjs(attendance.startTime);
    const attendanceEndTime = dayjs(attendance.endTime);

    setStartTime(attendanceStartTime);
    setEndTime(attendanceEndTime);

    if (attendanceStartTime && attendanceEndTime) {
      const diff = attendanceEndTime.diff(attendanceStartTime, "hour", true);
      setTotalTime(diff.toFixed(1));
    }
  }, [attendance]);

  const handleStartTimeChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setStartTime(date);

      if (endTime) {
        const diff = endTime.diff(date, "hour", true);
        setTotalTime(diff.toFixed(1));
      }
    }
  };

  const handleEndTimeChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setEndTime(date);

      if (startTime) {
        const diff = date.diff(startTime, "hour", true);
        setTotalTime(diff.toFixed(1));
      }
    }
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
