import { useAuthenticator } from "@aws-amplify/ui-react";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceEditor from "../../components/attendance_editor/AttendanceEditor";

export default function AdminAttendanceEditor() {
  const { route, user } = useAuthenticator();
  const navigate = useNavigate();

  const cognitoUserId = user?.attributes?.sub;

  useEffect(() => {
    if (route !== "idle" && route !== "authenticated") {
      navigate("/login");
    }
  }, [route]);

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <AttendanceEditor cognitoUserId={cognitoUserId} />
    </Container>
  );
}
