import { Typography } from "@mui/material";
import { StaffType } from "../../../hooks/useStaffs/useStaffs";
import { Label } from "./Label";

export function StaffNameItem({ staff }: { staff: StaffType }) {
  return (
    <>
      <Label variant="body1">スタッフ</Label>
      <Typography variant="body1">
        {`${staff.familyName} ${staff.givenName}`}
      </Typography>
    </>
  );
}
