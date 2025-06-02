import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Chip, Stack } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

type QuickInputTime = { time: string; enabled: boolean };

export default function QuickInputChips({
  quickInputTimes,
  workDate,
  disabled = false,
  onSelectTime,
}: {
  quickInputTimes: QuickInputTime[];
  workDate: Dayjs;
  disabled?: boolean;
  onSelectTime: (isoString: string) => void;
}) {
  return (
    <Stack direction="row" spacing={1}>
      {quickInputTimes.map((entry, index) => (
        <Chip
          key={index}
          label={entry.time}
          color={entry.enabled ? "success" : "default"}
          variant="outlined"
          icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
          disabled={disabled}
          onClick={() => {
            const endTime = dayjs(
              `${workDate.format("YYYY-MM-DD")} ${entry.time}`
            ).toISOString();
            onSelectTime(endTime);
          }}
        />
      ))}
    </Stack>
  );
}
