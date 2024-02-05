import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Container, Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AttendanceList from "../components/attendance_list/AttendanceList";

export default function List() {
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
        <Box sx={{ height: 1 }}>
          <AttendanceList />
        </Box>
      </Stack>
    </Container>
  );
}
