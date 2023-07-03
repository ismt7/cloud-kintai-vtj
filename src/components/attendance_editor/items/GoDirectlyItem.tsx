import { Box, Checkbox, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatchV2, useAppSelectorV2 } from "../../../app/hooks";
import {
  fetchAttendance,
  selectAttendanceEditor,
} from "../attendanceEditorSlice";

export default function GoDirectlyItem() {
  const dispatch = useAppDispatchV2();
  const attendanceEditorData = useAppSelectorV2(selectAttendanceEditor);
  const { attendance } = attendanceEditorData;
  const [goDirectly, setGoDirectly] = useState<boolean>(false);

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
      setGoDirectly(attendance.goDirectlyFlag);
    }
  }, [attendance]);

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>直行</Box>
      <Box>
        <Checkbox
          checked={goDirectly}
          onChange={() => setGoDirectly(!goDirectly)}
        />
      </Box>
    </Stack>
  );
}
