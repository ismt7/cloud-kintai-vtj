// cspell:ignore ampm
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Stack } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatchV2, useAppSelectorV2 } from "../../../app/hooks";
import { OriginRest } from "../../../lib/time_record/FetchRest";
import { selectAttendanceEditor } from "../attendanceEditorSlice";
import { updateRests } from "../mocks/MockReducer";

export default function RestTimeItem() {
  const { rests } = useAppSelectorV2(selectAttendanceEditor);

  const [restTimes, setRestTimes] = useState<OriginRest[]>(rests ?? []);
  const [totalRestTimes, setTotalRestTimes] = useState<string[]>([]);

  useEffect(() => {
    setRestTimes(rests ?? []);

    // 合計時間を計算
    const newTotalRestTimes = rests?.map((rest) => {
      const { startTime, endTime } = rest;
      if (!startTime || !endTime) {
        return "0";
      }

      const diff = dayjs(endTime).diff(startTime, "hour", true);
      return diff.toFixed(1);
    });
    setTotalRestTimes(newTotalRestTimes ?? []);
  }, [rests]);

  const dispatch = useAppDispatchV2();
  useEffect(() => {
    void dispatch(updateRests(restTimes));
  }, [restTimes]);

  const formItems = restTimes.map((restTime, index) => {
    const { startTime, endTime } = restTime;

    return (
      <Box key={index}>
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Box>
            <Stack direction="row" spacing={1} alignItems={"center"}>
              <Box>
                <TimePicker
                  label="開始時刻"
                  ampm={false}
                  value={startTime ? dayjs(startTime) : null}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                  }}
                  onChange={(newStartTime) => {
                    const newRestTimes = [...restTimes];
                    newRestTimes[index] = {
                      ...newRestTimes[index],
                      startTime: newStartTime?.toISOString() ?? undefined,
                    };
                    setRestTimes(newRestTimes);

                    // 合計時間を計算
                    if (newStartTime && endTime) {
                      const newTotalRestTimes = [...totalRestTimes];
                      const diff = dayjs(endTime).diff(
                        newStartTime,
                        "hour",
                        true
                      );
                      newTotalRestTimes[index] = diff.toFixed(1);
                      setTotalRestTimes(newTotalRestTimes);
                    }
                  }}
                />
              </Box>
              <Box>～</Box>
              <Box>
                <TimePicker
                  label="終了時刻"
                  ampm={false}
                  value={endTime ? dayjs(endTime) : null}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                  }}
                  onChange={(newEndTime) => {
                    const newRestTimes = [...restTimes];
                    newRestTimes[index] = {
                      ...newRestTimes[index],
                      endTime: newEndTime?.toISOString() ?? undefined,
                    };
                    setRestTimes(newRestTimes);

                    // 合計時間を計算
                    if (newEndTime && startTime) {
                      const newTotalRestTimes = [...totalRestTimes];
                      const diff = dayjs(newEndTime).diff(
                        startTime,
                        "hour",
                        true
                      );
                      newTotalRestTimes[index] = diff.toFixed(1);
                      setTotalRestTimes(newTotalRestTimes);
                    }
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
            {totalRestTimes[index] ?? "0.0"}時間
          </Box>
        </Stack>
      </Box>
    );
  });

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
                const { targetWorkDate, targetStaffId } = useParams();

                const newRestTimes = [...(restTimes ?? [])];
                newRestTimes.push({
                  restTimeId: 0,
                  staffId: Number(targetStaffId),
                  workDate: targetWorkDate,
                  startTime: undefined,
                  endTime: undefined,
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
