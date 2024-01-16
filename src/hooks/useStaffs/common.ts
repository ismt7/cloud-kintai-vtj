export enum StaffRole {
  ADMIN = "管理者",
  STAFF_ADMIN = "スタッフ管理者",
  STAFF = "スタッフ",
  GUEST = "ゲスト",
}

export interface Staff {
  sub: string;
  givenName: string;
  familyName: string;
  mailAddress: string;
  role: StaffRole[];
}
