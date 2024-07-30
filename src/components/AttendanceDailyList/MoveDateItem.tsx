import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

type MoveDateItemProps = {
  workDate: dayjs.Dayjs;
};

export default function MoveDateItem(props: MoveDateItemProps) {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box>
        <IconButton
          onClick={() => {
            const prevDate = props.workDate.add(-1, "day");
            navigate(`/admin/attendances/${prevDate.format("YYYYMMDD")}`);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <DatePicker
        value={props.workDate}
        format="YYYY/MM/DD"
        slotProps={{
          textField: { size: "small" },
        }}
        onChange={(date) => {
          if (date) {
            navigate(`/admin/attendances/${date.format("YYYYMMDD")}`);
          }
        }}
      />
      <Box>
        <IconButton
          onClick={() => {
            const nextDate = props.workDate.add(1, "day");
            navigate(`/admin/attendances/${nextDate.format("YYYYMMDD")}`);
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Stack>
  );
}
