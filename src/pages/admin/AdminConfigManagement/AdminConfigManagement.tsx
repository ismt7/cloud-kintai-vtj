import Title from "@/components/common/Title";
import {
  Stack,
  Button,
  Typography,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { predefinedIcons } from "@/constants/icons";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
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
    getLinks,
    getReasons,
    getOfficeMode,
    getQuickInputStartTimes,
    getQuickInputEndTimes,
    loading,
  } = useAppConfig();
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [quickInputStartTimes, setQuickInputStartTimes] = useState<
    { time: Dayjs; enabled: boolean }[]
  >([]);
  const [quickInputEndTimes, setQuickInputEndTimes] = useState<
    { time: Dayjs; enabled: boolean }[]
  >([]);
  const [id, setId] = useState<string | null>(null);
  const [links, setLinks] = useState<
    { label: string; url: string; enabled: boolean; icon: string }[]
  >([]);
  const [reasons, setReasons] = useState<
    { reason: string; enabled: boolean }[]
  >([]);
  const [officeMode, setOfficeMode] = useState<boolean>(false);
  const dispatch = useAppDispatchV2();

  useEffect(() => {
    fetchConfig();
  }, []);

  useEffect(() => {
    setStartTime(getStartTime());
    setEndTime(getEndTime());
    setId(getConfigId());
    setLinks(getLinks());
    setReasons(getReasons());
    setOfficeMode(getOfficeMode());
    const quickInputStartTimes = getQuickInputStartTimes();
    setQuickInputStartTimes(
      quickInputStartTimes.map((entry) => ({
        time: dayjs(entry.time, "HH:mm"),
        enabled: entry.enabled,
      }))
    );
    setQuickInputEndTimes(
      getQuickInputEndTimes().map((entry) => ({
        time: dayjs(entry.time, "HH:mm"),
        enabled: entry.enabled,
      }))
    );
  }, [loading]);

  const handleAddLink = () => {
    setLinks([...links, { label: "", url: "", enabled: true, icon: "" }]);
  };

  const handleLinkChange = (
    index: number,
    field: "label" | "url" | "enabled" | "icon",
    value: string | boolean
  ) => {
    const updatedLinks = [...links];
    updatedLinks[index][field as keyof (typeof updatedLinks)[number]] =
      value as never;
    setLinks(updatedLinks);
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleAddReason = () => {
    setReasons([...reasons, { reason: "", enabled: true }]);
  };

  const handleReasonChange = (
    index: number,
    field: "reason" | "enabled",
    value: string | boolean
  ) => {
    const updatedReasons = [...reasons];
    updatedReasons[index][field as keyof (typeof updatedReasons)[number]] =
      value as never;
    setReasons(updatedReasons);
  };

  const handleRemoveReason = (index: number) => {
    const updatedReasons = reasons.filter((_, i) => i !== index);
    setReasons(updatedReasons);
  };

  const handleOfficeModeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOfficeMode(event.target.checked);
  };

  const handleAddQuickInputStartTime = () => {
    setQuickInputStartTimes([
      ...quickInputStartTimes,
      { time: dayjs(), enabled: true },
    ]);
  };

  const handleQuickInputStartTimeChange = (
    index: number,
    newValue: Dayjs | null
  ) => {
    const updatedStartTimes = [...quickInputStartTimes];
    if (newValue) {
      updatedStartTimes[index].time = newValue;
    }
    setQuickInputStartTimes(updatedStartTimes);
  };

  const handleQuickInputStartTimeToggle = (index: number) => {
    const updatedStartTimes = [...quickInputStartTimes];
    updatedStartTimes[index].enabled = !updatedStartTimes[index].enabled;
    setQuickInputStartTimes(updatedStartTimes);
  };

  const handleRemoveQuickInputStartTime = (index: number) => {
    const updatedStartTimes = quickInputStartTimes.filter(
      (_, i) => i !== index
    );
    setQuickInputStartTimes(updatedStartTimes);
  };

  const handleAddQuickInputEndTime = () => {
    setQuickInputEndTimes([
      ...quickInputEndTimes,
      { time: dayjs(), enabled: true },
    ]);
  };

  const handleQuickInputEndTimeChange = (
    index: number,
    newValue: Dayjs | null
  ) => {
    const updatedEndTimes = [...quickInputEndTimes];
    if (newValue) {
      updatedEndTimes[index].time = newValue;
    }
    setQuickInputEndTimes(updatedEndTimes);
  };

  const handleQuickInputEndTimeToggle = (index: number) => {
    const updatedEndTimes = [...quickInputEndTimes];
    updatedEndTimes[index].enabled = !updatedEndTimes[index].enabled;
    setQuickInputEndTimes(updatedEndTimes);
  };

  const handleRemoveQuickInputEndTime = (index: number) => {
    const updatedEndTimes = quickInputEndTimes.filter((_, i) => i !== index);
    setQuickInputEndTimes(updatedEndTimes);
  };

  const handleSave = async () => {
    if (startTime && endTime) {
      try {
        if (id) {
          await saveConfig({
            id,
            workStartTime: startTime.format("HH:mm"),
            workEndTime: endTime.format("HH:mm"),
            links: links.map((link) => ({
              label: link.label,
              url: link.url,
              enabled: link.enabled,
              icon: link.icon,
            })),
            reasons: reasons.map((reason) => ({
              reason: reason.reason,
              enabled: reason.enabled,
            })),
            officeMode,
            quickInputStartTimes: quickInputStartTimes.map((entry) => ({
              time: entry.time.format("HH:mm"),
              enabled: entry.enabled,
            })),
            quickInputEndTimes: quickInputEndTimes.map((entry) => ({
              time: entry.time.format("HH:mm"),
              enabled: entry.enabled,
            })),
          });
          dispatch(setSnackbarSuccess(S14002));
        } else {
          await saveConfig({
            name: "default",
            workStartTime: startTime.format("HH:mm"),
            workEndTime: endTime.format("HH:mm"),
            links: links.map((link) => ({
              label: link.label,
              url: link.url,
              enabled: link.enabled,
              icon: link.icon,
            })),
            reasons: reasons.map((reason) => ({
              reason: reason.reason,
              enabled: reason.enabled,
            })),
            officeMode,
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
      <Stack spacing={2} sx={{ pb: 2 }}>
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
        <Typography variant="h6">オフィスモード</Typography>
        <Typography variant="body2" color="textSecondary">
          オフィスモードを有効にすると、オフィスに設置した端末からQRコードを読み込み出退勤が可能になります。
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={officeMode}
              onChange={handleOfficeModeChange}
              color="primary"
            />
          }
          label={officeMode ? "有効" : "無効"}
        />
        <Typography variant="h6">リンク集</Typography>
        <Typography variant="body2" color="textSecondary">
          ヘッダーのリンク集に表示するリンクを設定してください。
          <br />
          URL内で<code>{"{staffName}"}</code>
          を使用すると、スタッフ名が動的に挿入されます。
        </Typography>
        <Stack spacing={2}>
          {links.map((link, index) => (
            <Stack direction="row" spacing={2} alignItems="center" key={index}>
              <TextField
                label="ラベル"
                value={link.label}
                onChange={(e) =>
                  handleLinkChange(index, "label", e.target.value)
                }
                size="small"
                sx={{ flex: 1 }}
              />
              <TextField
                label="URL"
                value={link.url}
                onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                size="small"
                sx={{ flex: 2 }}
              />
              <Select
                value={link.icon}
                onChange={(e) =>
                  handleLinkChange(index, "icon", e.target.value)
                }
                size="small"
                sx={{ flex: 1 }}
              >
                {predefinedIcons.map((icon) => (
                  <MenuItem key={icon.value} value={icon.value}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {icon.component}
                      <span>{icon.label}</span>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={link.enabled}
                    onChange={(e) =>
                      handleLinkChange(index, "enabled", e.target.checked)
                    }
                  />
                }
                label="有効"
              />
              <IconButton onClick={() => handleRemoveLink(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
          <Button
            variant="text"
            size="small"
            onClick={handleAddLink}
            sx={{ alignSelf: "flex-start" }}
          >
            リンクを追加
          </Button>
        </Stack>
        <Typography variant="h6">修正理由</Typography>
        <Typography variant="body2" color="textSecondary">
          修正理由のテキスト一覧を管理してください。
        </Typography>
        <Stack spacing={2}>
          {reasons.map((reason, index) => (
            <Stack direction="row" spacing={2} alignItems="center" key={index}>
              <TextField
                label={`理由 ${index + 1}`}
                value={reason.reason}
                onChange={(e) =>
                  handleReasonChange(index, "reason", e.target.value)
                }
                size="small"
                sx={{ flex: 1 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={reason.enabled}
                    onChange={(e) =>
                      handleReasonChange(index, "enabled", e.target.checked)
                    }
                  />
                }
                label="有効"
              />
              <IconButton
                onClick={() => handleRemoveReason(index)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
          <Button
            variant="text"
            size="small"
            onClick={handleAddReason}
            sx={{ alignSelf: "flex-start" }}
          >
            理由を追加
          </Button>
        </Stack>
        <Typography variant="h6">簡単時間入力</Typography>
        <Typography variant="body2" color="textSecondary">
          勤怠編集画面でボタンを押すと時刻が簡単に入力されます。
          <br />
          この機能は、勤務開始時刻と勤務終了時刻のみを設定できます。
        </Typography>
        <Stack direction="row" spacing={4}>
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Typography variant="subtitle1">出勤時間</Typography>
            {quickInputStartTimes.map((entry, index) => (
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                key={index}
              >
                <TimePicker
                  label={`出勤時間 ${index + 1}`}
                  ampm={false}
                  value={entry.time}
                  views={["hours", "minutes"]}
                  format="HH:mm"
                  slotProps={{
                    textField: { size: "small" },
                  }}
                  sx={{ flex: 1 }}
                  onChange={(newValue) =>
                    handleQuickInputStartTimeChange(index, newValue)
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={entry.enabled}
                      onChange={() => handleQuickInputStartTimeToggle(index)}
                    />
                  }
                  label="有効"
                />
                <IconButton
                  onClick={() => handleRemoveQuickInputStartTime(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
            <Button
              variant="text"
              size="small"
              onClick={handleAddQuickInputStartTime}
              sx={{ alignSelf: "flex-start" }}
            >
              出勤時間を追加
            </Button>
          </Stack>
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Typography variant="subtitle1">退勤時間</Typography>
            {quickInputEndTimes.map((entry, index) => (
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                key={index}
              >
                <TimePicker
                  label={`退勤時間 ${index + 1}`}
                  ampm={false}
                  value={entry.time}
                  views={["hours", "minutes"]}
                  format="HH:mm"
                  slotProps={{
                    textField: { size: "small" },
                  }}
                  sx={{ flex: 1 }}
                  onChange={(newValue) =>
                    handleQuickInputEndTimeChange(index, newValue)
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={entry.enabled}
                      onChange={() => handleQuickInputEndTimeToggle(index)}
                    />
                  }
                  label="有効"
                />
                <IconButton
                  onClick={() => handleRemoveQuickInputEndTime(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
            <Button
              variant="text"
              size="small"
              onClick={handleAddQuickInputEndTime}
              sx={{ alignSelf: "flex-start" }}
            >
              退勤時間を追加
            </Button>
          </Stack>
        </Stack>
        <Button variant="contained" color="primary" onClick={handleSave}>
          保存
        </Button>
      </Stack>
    </LocalizationProvider>
  );
}
