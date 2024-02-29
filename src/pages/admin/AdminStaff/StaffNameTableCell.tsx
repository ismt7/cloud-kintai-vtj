import { TableCell } from "@mui/material";
import { StaffType } from "../../../hooks/useStaffs/useStaffs";

export function StaffNameTableCell({ staff }: { staff: StaffType }) {
  const { familyName, givenName } = staff;
  const fullName = `${familyName} ${givenName}`;

  return <TableCell>{fullName}</TableCell>;
}
