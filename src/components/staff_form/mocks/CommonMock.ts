import { Staff } from "../../../api";

export enum StaffRole {
  SYSTEM_ADMIN = 1,
  STAFF = 2,
  STAFF_ADMIN = 3,
}

export function GetStaff(roleId: StaffRole): Staff {
  const roleTexts = {
    1: "システム管理者",
    2: "スタッフ",
    3: "スタッフ管理者",
  };

  return {
    staffId: 999,
    lastName: "田中",
    firstName: "太郎",
    mailAddress: "tanaka@example.com",
    iconPath: "",
    staffRoles: {
      roleId,
      staffId: 999,
      role: {
        roleName: roleTexts[roleId],
      },
    },
  };
}
