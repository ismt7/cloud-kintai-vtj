import { Box, Container, Stack } from "@mui/material";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceDailyList from "../../components/attendance_daily_list/AttendanceDailyList";
import DownloadForm from "../../components/download_form/DownloadForm";

export default function AdminAttendance() {
  const { route } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    if (route !== "idle" && route !== "authenticated") {
      navigate("/login");
    }
  }, [route]);

  return (
    <Container maxWidth="xl">
      <Stack direction="column" sx={{ height: 1, pt: 2, display: "flex" }}>
        <Box>
          <DownloadForm />
        </Box>
        <Box sx={{ flexGrow: 2, py: 2 }}>
          <AttendanceDailyList />
        </Box>
      </Stack>
    </Container>
  );
}
