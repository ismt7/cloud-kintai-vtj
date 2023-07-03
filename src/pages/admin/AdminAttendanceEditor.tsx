import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import AttendanceEditor from "../../components/attendance_editor/AttendanceEditor";

export default function AdminAttendanceEditor() {
  const { id } = useParams();

  return (
    <>
      <div>勤怠編集画面です。(id: {id})</div>
      <Box sx={{ px: { lg: "20%" } }}>
        <AttendanceEditor />
      </Box>
    </>
  );
}
