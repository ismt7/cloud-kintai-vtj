import { Stack, Typography } from "@mui/material";

import { StaffType } from "../../../hooks/useStaffs/useStaffs";

interface StaffNameItemProps {
  staff: StaffType | undefined | null;
}

export default function StaffNameItem({ staff }: StaffNameItemProps) {
  if (!staff || (!staff.familyName && !staff.givenName)) return null;

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="body1" sx={{ fontWeight: "bold", width: "150px" }}>
        スタッフ
      </Typography>
      <Typography variant="body1">
        {`${staff.familyName} ${staff.givenName}`}
      </Typography>
    </Stack>
  );
}
