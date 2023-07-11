import { Box, Stack } from "@mui/material";

import AttendanceDailyList from "../../components/attendance_daily_list/AttendanceDailyList";
import DownloadForm from "../../components/download_form/DownloadForm";

export default function AdminAttendance() {
  return (
    <Stack
      direction="column"
      sx={{ height: 1, py: 2, px: "25%", display: "flex" }}
    >
      <Box>
        <DownloadForm />
      </Box>
      <Box sx={{ flexGrow: 2, py: 2 }}>
        <AttendanceDailyList />
      </Box>
    </Stack>
  );
}
