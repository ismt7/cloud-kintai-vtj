import { TableCell } from "@mui/material";
import { StaffRole, StaffType } from "../../../hooks/useStaffs/useStaffs";

export function RoleTableCell({ staff }: { staff: StaffType }) {
  const { role, owner } = staff;
  const roleMap = new Map<StaffRole, string>([
    [StaffRole.OWNER, "オーナー"],
    [StaffRole.ADMIN, "管理者"],
    [StaffRole.STAFF_ADMIN, "スタッフ管理者"],
    [StaffRole.STAFF, "スタッフ"],
    [StaffRole.GUEST, "ゲスト"],
  ]);

  if (owner) {
    return <TableCell>{roleMap.get(StaffRole.OWNER) || "***"}</TableCell>;
  }

  return <TableCell>{roleMap.get(role) || "***"}</TableCell>;
}
