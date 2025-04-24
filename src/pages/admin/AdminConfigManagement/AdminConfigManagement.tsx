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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { predefinedIcons } from "@/constants/icons";
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
    getLinks,
    loading,
  } = useAppConfig();
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [links, setLinks] = useState<
    { label: string; url: string; enabled: boolean; icon: string }[]
  >([]);
  const dispatch = useAppDispatchV2();

  useEffect(() => {
    fetchConfig();
  }, []);

  useEffect(() => {
    setStartTime(getStartTime());
    setEndTime(getEndTime());
    setId(getConfigId());
    setLinks(getLinks());
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
        <Button variant="contained" color="primary" onClick={handleSave}>
          保存
        </Button>
      </Stack>
    </LocalizationProvider>
  );
}
