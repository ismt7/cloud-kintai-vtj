import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Attendance } from "../../../client";

export default function WorkDateItem({
  attendance,
}: {
  attendance: Attendance | null;
}) {
  if (!attendance) return <></>;

  const { work_date: workDate } = attendance;

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>勤務日</Box>
      <Box>
        <Typography variant="body1">
          {dayjs(workDate).format("YYYY/MM/DD")}
        </Typography>
      </Box>
    </Stack>
  );
}
