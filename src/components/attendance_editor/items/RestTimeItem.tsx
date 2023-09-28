// cspell:ignore ampm
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Rest } from "../../../client";

const initialRest = (staffId: number, workDate: string): Rest => ({
  staff_id: staffId,
  work_date: workDate,
  start_time: undefined,
  end_time: undefined,
  id: 0,
  created_at: "",
  updated_at: null,
  created_by: staffId,
  updated_by: null,
});

function RestTimePicker({
  rest,
  callback,
  onDelete,
}: {
  rest: Rest;
  callback: (
    startTime: dayjs.Dayjs | null,
    endTime: dayjs.Dayjs | null
  ) => void;
  onDelete?: () => void;
}) {
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [totalRestTime, setTotalRestTime] = useState<string>("0.0");

  useEffect(() => {
    setStartTime(rest.start_time ? dayjs(rest.start_time) : null);
  }, [rest.start_time]);

  useEffect(() => {
    setEndTime(rest.end_time ? dayjs(rest.end_time) : null);
  }, [rest.end_time]);

  useEffect(() => {
    if (startTime && endTime) {
      const diff = endTime.diff(startTime, "hour", true);
      setTotalRestTime(diff.toFixed(1));
    }
  }, [startTime, endTime]);

  return (
    <Stack direction="row" spacing={1} alignItems={"center"}>
      <Box>
        <TimePicker
          value={startTime}
          ampm={false}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
          }}
          onChange={(newStartTime) => {
            setStartTime(newStartTime);
            callback(newStartTime, endTime);
          }}
        />
      </Box>
      <Box>～</Box>
      <Box>
        <TimePicker
          value={endTime}
          ampm={false}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
          }}
          onChange={(newEndTime) => {
            setEndTime(newEndTime);
            callback(startTime, newEndTime);
          }}
        />
      </Box>
      <Box>
        <IconButton aria-label="staff-search" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1 }} textAlign={"right"}>
        {`${totalRestTime}時間`}
      </Box>
    </Stack>
  );
}

export default function RestTimeItem({
  staffId,
  workDate,
  rests,
  callback,
}: {
  staffId: number | undefined;
  workDate: string | undefined;
  rests: Rest[] | null;
  callback: (editRests: Rest[], totalTime: number) => void;
}) {
  if (!rests) return <></>;

  const [editRests, setEditRests] = useState<Rest[]>(rests);

  useEffect(() => {
    setEditRests(rests);
  }, [rests]);

  useEffect(() => {
    if (!editRests) return;

    let totalTime = 0;
    editRests.forEach((rest) => {
      if (!rest.start_time || !rest.end_time) return;

      const startTime = dayjs(rest.start_time);
      const endTime = dayjs(rest.end_time);

      if (!startTime.isValid() || !endTime.isValid()) return;

      const diff = endTime.diff(startTime, "hour", true);
      totalTime += diff;
    });

    callback(editRests, totalTime);
  }, [editRests]);

  return (
    <Stack direction="row">
      <Box sx={{ fontWeight: "bold", width: "150px" }}>休憩時間</Box>
      <Box sx={{ flexGrow: 2 }}>
        <Stack spacing={1}>
          {editRests.map((rest, index) => (
            <Box key={index}>
              <RestTimePicker
                rest={rest}
                callback={(startTime, endTime) => {
                  const newEditRests = [...editRests];
                  newEditRests[index] = {
                    ...newEditRests[index],
                    start_time: startTime?.toISOString() ?? undefined,
                    end_time: endTime?.toISOString() ?? undefined,
                  };
                  setEditRests(newEditRests);
                }}
                onDelete={() => {
                  const newEditRests = [...editRests];
                  newEditRests.splice(index, 1);
                  setEditRests(newEditRests);
                }}
              />
            </Box>
          ))}
          <Box>
            <IconButton
              aria-label="staff-search"
              onClick={() => {
                if (!staffId || !workDate) return;

                const newEditRests = [...editRests];
                newEditRests.push(initialRest(staffId, workDate));
                setEditRests(newEditRests);
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
