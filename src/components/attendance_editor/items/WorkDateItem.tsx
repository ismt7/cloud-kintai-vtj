import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppSelectorV2 } from "../../../app/hooks";
import { selectAttendanceEditor } from "../attendanceEditorSlice";

export default function WorkDateItem() {
  const { attendance } = useAppSelectorV2(selectAttendanceEditor);
  const [workDate, setWorkDate] = useState<dayjs.Dayjs | undefined>(
    attendance?.workDate ? dayjs(attendance.workDate) : undefined
  );

  useEffect(() => {
    if (!attendance) return;
    setWorkDate(attendance?.workDate ? dayjs(attendance.workDate) : undefined);
  }, [attendance]);

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>勤務日</Box>
      <Box>
        <Typography variant="body1">
          {workDate?.format("YYYY/MM/DD")}
        </Typography>
      </Box>
    </Stack>
  );
}
