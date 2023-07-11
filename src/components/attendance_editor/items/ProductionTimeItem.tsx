import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppSelectorV2 } from "../../../app/hooks";
import { selectAttendanceEditor } from "../attendanceEditorSlice";

export default function ProductionTimeItem() {
  const { attendance, rests } = useAppSelectorV2(selectAttendanceEditor);
  const [productionTime, setProductionTime] = useState<string>("0.0");

  useEffect(() => {
    if (!attendance || !rests) return;

    const productionTotalTime = dayjs(attendance.endTime).diff(
      dayjs(attendance.startTime),
      "hour",
      true
    );

    const restTotalTime = rests.reduce(
      (acc, cur) =>
        acc + dayjs(cur.endTime).diff(dayjs(cur.startTime), "hour", true),
      0
    );

    setProductionTime((productionTotalTime - restTotalTime).toFixed(1));
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
