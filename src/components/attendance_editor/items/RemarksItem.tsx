import { Box, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatchV2, useAppSelectorV2 } from "../../../app/hooks";
import {
  selectAttendanceEditor,
  updateAttendance,
} from "../attendanceEditorSlice";

export default function RemarksItem() {
  const { attendance } = useAppSelectorV2(selectAttendanceEditor);
  const [remarks, setRemarks] = useState<string>("");

  useEffect(() => {
    if (!attendance) return;

    setRemarks(attendance.remarks);
  }, [attendance]);

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>備考</Box>
      <Box sx={{ flexGrow: 2 }}>
        <TextField
          multiline
          minRows={2}
          fullWidth
          value={remarks}
          placeholder="備考欄：客先名やイベント名などを記載"
          sx={{ width: 1 }}
          onChange={(e) => {
            if (!attendance) return;

            setRemarks(e.target.value);

            const dispatch = useAppDispatchV2();
            void dispatch(
              updateAttendance({
                ...attendance,
                remarks: e.target.value,
              })
            );
          }}
        />
      </Box>
    </Stack>
  );
}
