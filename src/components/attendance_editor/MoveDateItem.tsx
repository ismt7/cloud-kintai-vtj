import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function MoveDateItem({
  staffId,
  workDate,
}: {
  staffId: string;
  workDate: dayjs.Dayjs | null;
}) {
  const navigate = useNavigate();

  if (!workDate) {
    return null;
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box>
        <IconButton
          onClick={() => {
            const prevDate = workDate.add(-1, "day");
            navigate(
              `/admin/attendances/edit/${prevDate.format(
                "YYYYMMDD"
              )}/${staffId}`
            );
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <DatePicker
        value={workDate}
        format="YYYY/MM/DD"
        slotProps={{
          textField: { size: "small" },
        }}
        onChange={(date) => {
          if (date) {
            navigate(
              `/admin/attendances/edit/${date.format("YYYYMMDD")}/${staffId}`
            );
          }
        }}
      />
      <Box>
        <IconButton
          onClick={() => {
            const nextDate = workDate.add(1, "day");
            navigate(
              `/admin/attendances/edit/${nextDate.format(
                "YYYYMMDD"
              )}/${staffId}`
            );
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Stack>
  );
}
