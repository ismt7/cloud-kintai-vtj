import Title from "@/components/common/Title";
import { Stack, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";
import useAppConfig from "@/hooks/useAppConfig/useAppConfig";
import { renderTimeViewClock } from "@mui/x-date-pickers";
import { useAppDispatchV2 } from "@/app/hooks";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "@/lib/reducers/snackbarReducer";
import { E14001, E14002, S14001, S14002 } from "@/errors";

export default function AdminConfigManagement() {
  const {
    fetchConfig,
    getStartTime,
    getEndTime,
    saveConfig,
    getConfigId,
    loading,
  } = useAppConfig();
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [id, setId] = useState<string | null>(null);
  const dispatch = useAppDispatchV2();

  useEffect(() => {
    fetchConfig();
  }, []);

  useEffect(() => {
    setStartTime(getStartTime());
    setEndTime(getEndTime());
    setId(getConfigId());
  }, [loading]);

  const handleSave = async () => {
    if (startTime && endTime) {
      try {
        if (id) {
          await saveConfig({
            id,
            workStartTime: startTime.format("HH:mm"),
            workEndTime: endTime.format("HH:mm"),
          });
          dispatch(setSnackbarSuccess(S14002));
        } else {
          await saveConfig({
            name: "default",
            workStartTime: startTime.format("HH:mm"),
            workEndTime: endTime.format("HH:mm"),
          });
          dispatch(setSnackbarSuccess(S14001));
        }
      } catch (error) {
        dispatch(setSnackbarError(E14001));
      }
    } else {
      dispatch(setSnackbarError(E14002));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2}>
        <Title text="設定" />
        <Typography variant="h6">勤務時間</Typography>
        <Typography variant="body2" color="textSecondary">
          所定の勤務時間を設定してください。
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <TimePicker
            label="開始時間"
            ampm={false}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
            }}
            value={startTime}
            views={["hours", "minutes"]}
            format="HH:mm"
            slotProps={{
              textField: { size: "small" },
            }}
            sx={{ maxWidth: 200 }}
            onChange={(newValue) => setStartTime(newValue)}
          />
          <Typography variant="body1">〜</Typography>
          <TimePicker
            label="終了時間"
            ampm={false}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
            }}
            value={endTime}
            views={["hours", "minutes"]}
            format="HH:mm"
            slotProps={{
              textField: { size: "small" },
            }}
            sx={{ maxWidth: 200 }}
            onChange={(newValue) => setEndTime(newValue)}
          />
        </Stack>
        <Button variant="contained" color="primary" onClick={handleSave}>
          保存
        </Button>
      </Stack>
    </LocalizationProvider>
  );
}
