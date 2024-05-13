import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Control, UseFormSetValue } from "react-hook-form";

import { AttendanceEditInputs } from "../../common";
import EndTimeInput from "./EndTimeInput";
import StartTimeInput from "./StartTimeInput";
import { Attendance } from "../../../../API";

export function calcTotalWorkTime(
  startTime: string | null | undefined,
  endTime: string | null | undefined
) {
  if (!startTime) return 0;

  const now = dayjs();
  const diff = dayjs(endTime || now).diff(dayjs(startTime), "hour", true);

  return diff;
}

export function WorkTimeInput({
  targetWorkDate,
  attendance,
  control,
  setValue,
}: {
  targetWorkDate: dayjs.Dayjs | null;
  attendance: Attendance | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
  setValue: UseFormSetValue<AttendanceEditInputs>;
}) {
  const [totalWorkTime, setTotalWorkTime] = useState<number>(0);

  useEffect(() => {
    if (!attendance) return;

    const diff = calcTotalWorkTime(attendance.startTime, attendance.endTime);
    setTotalWorkTime(diff);
  }, [targetWorkDate]);

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
            <Stack direction="row" spacing={1}>
              <Box>
                <StartTimeInput
                  workDate={targetWorkDate}
                  attendance={attendance}
                  control={control}
                  setValue={setValue}
                />
              </Box>
              <Box>
                <Typography variant="body1" sx={{ py: 1 }}>
                  ～
                </Typography>
              </Box>
              <Box>
                <EndTimeInput
                  workDate={targetWorkDate}
                  attendance={attendance}
                  control={control}
                  setValue={setValue}
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
