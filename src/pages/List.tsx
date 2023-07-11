import { Box, Stack } from "@mui/material";
import AttendanceList from "../components/attendance_list/AttendanceList";

function List() {
  return (
    <Stack
      direction="column"
      sx={{ height: 1, py: 2, px: "25%", display: "flex" }}
    >
      <Box sx={{ height: 1 }}>
        <AttendanceList />
      </Box>
    </Stack>
  );
}
export default List;
