import { Box } from "@mui/material";

import AttendanceList from "../components/attendance_list/AttendanceList";

function List() {
  return (
    <Box sx={{ px: { lg: "20%" } }}>
      <AttendanceList />
    </Box>
  );
}
export default List;
