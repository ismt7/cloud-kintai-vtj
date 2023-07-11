import { Box, Stack, Typography } from "@mui/material";
import { Staff } from "../../../api";
import { useAppSelectorV2 } from "../../../app/hooks";
import {
  AttendanceEditorStatus,
  selectAttendanceEditor,
} from "../attendanceEditorSlice";

function createFullName(
  status: AttendanceEditorStatus,
  staff: Staff | undefined
) {
  return status !== AttendanceEditorStatus.ERROR && staff
    ? `${staff.lastName} ${staff.firstName}`
    : "";
}

export default function StaffNameItem() {
  const { status, staff } = useAppSelectorV2(selectAttendanceEditor);

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>スタッフ</Box>
      <Box>
        <Typography variant="body1">{createFullName(status, staff)}</Typography>
      </Box>
    </Stack>
  );
}
