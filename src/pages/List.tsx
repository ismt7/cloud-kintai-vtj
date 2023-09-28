import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Container, Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceList from "../components/attendance_list/AttendanceList";

function List() {
  const { route, user } = useAuthenticator();
  const navigate = useNavigate();

  const cognitoUserId = user?.attributes?.sub;

  useEffect(() => {
    if (route !== "idle" && route !== "authenticated") {
      navigate("/login");
    }
  }, [route]);

  return (
    <Container maxWidth="xl">
      <Stack direction="column" sx={{ height: 1, pt: 2, display: "flex" }}>
        <Box sx={{ height: 1 }}>
          <AttendanceList cognitoUserId={cognitoUserId} />
        </Box>
      </Stack>
    </Container>
  );
}

export default List;
