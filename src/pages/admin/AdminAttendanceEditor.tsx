import { useAuthenticator } from "@aws-amplify/ui-react";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceEditor from "../../components/attendance_editor/AttendanceEditor";

export default function AdminAttendanceEditor() {
  const { route } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    if (route !== "idle" && route !== "authenticated") {
      navigate("/login");
    }
  }, [route]);

  return (
    <Container maxWidth="xl" sx={{ pt: 1 }}>
      <AttendanceEditor />
    </Container>
  );
}
