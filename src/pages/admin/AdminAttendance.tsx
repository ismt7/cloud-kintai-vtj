import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Breadcrumbs, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AttendanceDailyList from "../../components/AttendanceDailyList/AttendanceDailyList";
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
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Box>
          <Breadcrumbs>
            <Link to="/" color="inherit">
              TOP
            </Link>
            <Typography color="text.primary">勤怠管理</Typography>
          </Breadcrumbs>
        </Box>
        <Stack spacing={1}>
          <Box>
            <DownloadForm />
          </Box>
          <Box sx={{ flexGrow: 2, py: 2 }}>
            <AttendanceDailyList />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}
