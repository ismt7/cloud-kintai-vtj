import { Box } from "@mui/material";
import AttendanceEditor from "../../components/attendance_editor/AttendanceEditor";

export default function AdminAttendanceEditor() {
  return (
    <Box sx={{ py: 2, px: "30%" }}>
      <AttendanceEditor />
    </Box>
  );
}
