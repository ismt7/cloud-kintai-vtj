import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import MoveDateItem from "./MoveDateItem";

export default function WorkDateItem({
  workDate,
}: {
  workDate: dayjs.Dayjs | null;
}) {
  return (
    <Stack direction="row" alignItems={"center"}>
      <Typography variant="body1" sx={{ fontWeight: "bold", width: "150px" }}>
        勤務日
      </Typography>
      <Box>
        <MoveDateItem workDate={workDate} />
      </Box>
    </Stack>
  );
}
