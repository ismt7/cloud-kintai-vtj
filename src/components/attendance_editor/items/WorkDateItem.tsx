import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatchV2, useAppSelectorV2 } from "../../../app/hooks";
import {
  fetchAttendance,
  selectAttendanceEditor,
} from "../attendanceEditorSlice";

export default function WorkDateItem() {
  const dispatch = useAppDispatchV2();
  const attendanceEditorData = useAppSelectorV2(selectAttendanceEditor);
  const { attendance } = attendanceEditorData;
  const [workDate, setWorkDate] = useState<dayjs.Dayjs | undefined>(undefined);

  useEffect(() => {
    void dispatch(
      fetchAttendance({
        staffId: 999,
        workDate: Number(dayjs().format("YYYYMMDD")),
      })
    );
  }, []);

  useEffect(() => {
    if (attendance) {
      setWorkDate(dayjs(attendance.workDate));
    }
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
