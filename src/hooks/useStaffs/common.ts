import dayjs from "dayjs";

export enum StaffRole {
  ADMIN = "Admin",
  STAFF_ADMIN = "StaffAdmin",
  STAFF = "Staff",
  GUEST = "Guest",
  NONE = "None",
}

export interface Staff {
  sub: string;
  enabled: boolean;
  status: string;
  givenName: string;
  familyName: string;
  mailAddress: string;
  roles: StaffRole[];
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
}
