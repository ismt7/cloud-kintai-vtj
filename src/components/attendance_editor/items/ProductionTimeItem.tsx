import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatchV2, useAppSelectorV2 } from "../../../app/hooks";
import {
  fetchAttendance,
  fetchRests,
  selectAttendanceEditor,
} from "../attendanceEditorSlice";

export default function ProductionTimeItem() {
  const dispatch = useAppDispatchV2();
  const attendanceEditorData = useAppSelectorV2(selectAttendanceEditor);
  const { attendance, rests } = attendanceEditorData;

  const [productionTime, setProductionTime] = useState<string>("0");

  useEffect(() => {
    void dispatch(
      fetchAttendance({
        staffId: 999,
        workDate: Number(dayjs().format("YYYYMMDD")),
      })
    );

    void dispatch(
      fetchRests({
        staffId: 999,
        workDate: Number(dayjs().format("YYYYMMDD")),
      })
    );
  }, []);

  useEffect(() => {
    if (!attendance || !rests) return;
    const productionTotalTime = dayjs(attendance.endTime).diff(
      dayjs(attendance.startTime),
      "hour"
    );
    const restTotalTime = rests.reduce(
      (acc, cur) => acc + dayjs(cur.endTime).diff(dayjs(cur.startTime), "hour"),
      0
    );

    setProductionTime(String(productionTotalTime - restTotalTime));
  }, [attendance, rests]);

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>実稼働時間</Box>
      <Box sx={{ flexGrow: 2 }} textAlign={"right"}>
        <Typography variant="body1">{productionTime}時間</Typography>
      </Box>
    </Stack>
  );
}
