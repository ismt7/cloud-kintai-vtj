import { Attendance, Service } from "../../../client";

const ADMIN_USER_ID = 1;

export default async function deleteAttendanceData(id: Attendance["id"]) {
  await Service.deleteAttendance(id, ADMIN_USER_ID).catch((e: Error) => {
    throw e;
  });

  return true;
}
