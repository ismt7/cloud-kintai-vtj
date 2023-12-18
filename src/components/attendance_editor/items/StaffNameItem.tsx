import { Box, Stack, Typography } from "@mui/material";
import { Staff } from "../../../hooks/useStaffs/common";

export default function StaffNameItem({
  staff,
}: {
  staff: Staff | undefined | null;
}) {
  if (!staff || (!staff.familyName && !staff.givenName)) return null;

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>スタッフ</Box>
      <Box>
        <Typography variant="body1">
          {`${staff.familyName} ${staff.givenName}`}
        </Typography>
      </Box>
    </Stack>
  );
}
