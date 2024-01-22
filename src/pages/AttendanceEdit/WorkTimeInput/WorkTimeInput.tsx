import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { AttendanceEditInputs } from "../common";
import StartTimeInput from "./StartTimeInput";
import EndTimeInput from "./EndTimeInput";

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
  control,
  watch,
  setValue,
  getValues,
}: {
  targetWorkDate: dayjs.Dayjs | null;
  control: Control<AttendanceEditInputs, any>;
  watch: UseFormWatch<AttendanceEditInputs>;
  setValue: UseFormSetValue<AttendanceEditInputs>;
  getValues: UseFormGetValues<AttendanceEditInputs>;
}) {
  const [totalWorkTime, setTotalWorkTime] = useState<number>(0);

  useEffect(() => {
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
            <Stack direction="row" spacing={1}>
              <Box>
                <StartTimeInput
                  workDate={targetWorkDate}
                  control={control}
                  setValue={setValue}
                />
              </Box>
              <Box>
                <Typography variant="body1" sx={{ py: 2 }}>
                  ～
                </Typography>
              </Box>
              <Box>
                <EndTimeInput
                  workDate={targetWorkDate}
                  control={control}
                  setValue={setValue}
                  getValues={getValues}
                  watch={watch}
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
