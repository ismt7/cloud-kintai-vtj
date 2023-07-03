import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatchV2, useAppSelectorV2 } from "../../../app/hooks";
import {
  AttendanceEditorStatus,
  fetchStaff,
  selectAttendanceEditor,
} from "../attendanceEditorSlice";

export default function StaffNameItem() {
  const attendanceEditorData = useAppSelectorV2(selectAttendanceEditor);
  const dispatch = useAppDispatchV2();

  const fullName = (() => {
    const { status, staff } = attendanceEditorData;

    if (status === AttendanceEditorStatus.ERROR || !staff) {
      return "";
    }

    return `${staff.lastName} ${staff.firstName}`;
  })();

  useEffect(() => {
    void dispatch(
      fetchStaff({
        staffId: 999,
      })
    );
  }, []);

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>スタッフ</Box>
      <Box>
        <Typography variant="body1">{fullName}</Typography>
      </Box>
    </Stack>
  );
}
