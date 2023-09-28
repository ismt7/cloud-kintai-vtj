import { Box, Stack, Typography } from "@mui/material";
import { Staff } from "../../../client";

export default function StaffNameItem({ staff }: { staff: Staff | null }) {
  if (!staff?.last_name || !staff?.first_name) return <></>;

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>スタッフ</Box>
      <Box>
        <Typography variant="body1">
          {`${staff.last_name} ${staff.first_name}`}
        </Typography>
      </Box>
    </Stack>
  );
}
