import { Box, IconButton, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";

export default function MoveDateItem({
  workDate,
}: {
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
            navigate(`/attendance/${prevDate.format("YYYYMMDD")}/edit`);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <DatePicker
        value={workDate}
        format="YYYY/MM/DD"
        onChange={(date) => {
          if (date) {
            navigate(`/attendance/${date.format("YYYYMMDD")}/edit`);
          }
        }}
      />
      <Box>
        <IconButton
          onClick={() => {
            const nextDate = workDate.add(1, "day");
            navigate(`/attendance/${nextDate.format("YYYYMMDD")}/edit`);
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Stack>
  );
}
