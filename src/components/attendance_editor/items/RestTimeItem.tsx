// cspell:ignore ampm
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Stack } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatchV2, useAppSelectorV2 } from "../../../app/hooks";
import { fetchRests, selectAttendanceEditor } from "../attendanceEditorSlice";

interface RestTime {
  startTime?: dayjs.Dayjs;
  endTime?: dayjs.Dayjs;
  totalTime: string;
}

export default function RestTimeItem() {
  const dispatch = useAppDispatchV2();
  const attendanceEditorData = useAppSelectorV2(selectAttendanceEditor);
  const { rests } = attendanceEditorData;

  const [restTimes, setRestTimes] = useState<RestTime[]>([]);

  useEffect(() => {
    void dispatch(
      fetchRests({
        staffId: 999,
        workDate: Number(dayjs().format("YYYYMMDD")),
      })
    );
  }, []);

  useEffect(() => {
    if (!rests) {
      return;
    }

    const updatedRests = rests.map((rest) => {
      const { startTime, endTime } = rest;

      const totalTime = (() => {
        if (!startTime || !endTime) {
          return "0";
        }

        const diff = dayjs(endTime).diff(dayjs(startTime), "hour", true);
        return diff.toFixed(1);
      })();

      return {
        startTime: dayjs(startTime),
        endTime: dayjs(endTime),
        totalTime,
      };
    });

    setRestTimes(updatedRests);
  }, [rests]);

  const formItems = restTimes.map((restTime, index) => (
    <Box key={index}>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        <Box>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <Box>
              <TimePicker
                label="開始時刻"
                ampm={false}
                value={restTime.startTime}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                }}
                onChange={(date) => {
                  const newRestTimes = [...restTimes];
                  newRestTimes[index].startTime = date ?? undefined;

                  if (date && restTime.endTime) {
                    const diff = restTime.endTime.diff(date, "hour", true);
                    newRestTimes[index].totalTime = diff.toFixed(1);
                  }

                  setRestTimes(newRestTimes);
                }}
              />
            </Box>
            <Box>～</Box>
            <Box>
              <TimePicker
                label="終了時刻"
                ampm={false}
                value={restTime.endTime}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                }}
                onChange={(date) => {
                  const newRestTimes = [...restTimes];
                  newRestTimes[index].endTime = date ?? undefined;

                  if (date && restTime.startTime) {
                    const diff = date.diff(restTime.startTime, "hour", true);
                    newRestTimes[index].totalTime = diff.toFixed(1);
                  }

                  setRestTimes(newRestTimes);
                }}
              />
            </Box>
          </Stack>
        </Box>
        <Box>
          <IconButton
            aria-label="staff-search"
            onClick={() => {
              const newRestTimes = [...restTimes];
              newRestTimes.splice(index, 1);
              setRestTimes(newRestTimes);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 2 }} textAlign={"right"}>
          {restTime.totalTime}時間
        </Box>
      </Stack>
    </Box>
  ));

  return (
    <Stack direction="row">
      <Box sx={{ fontWeight: "bold", width: "150px" }}>休憩時間</Box>
      <Box sx={{ flexGrow: 2 }}>
        <Stack spacing={1}>
          {formItems}
          <Box>
            <IconButton
              aria-label="staff-search"
              onClick={() => {
                const newRestTimes = [...restTimes];
                newRestTimes.push({
                  startTime: undefined,
                  endTime: undefined,
                  totalTime: "0",
                });
                setRestTimes(newRestTimes);
              }}
            >
              <AddAlarmIcon />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
