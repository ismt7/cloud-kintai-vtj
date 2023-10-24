import dayjs from "dayjs";
import { Service, Staff } from "../../client";

export default async function fetchAttendance(staff: Staff) {
  const now = dayjs();
  const today = now.format("YYYYMMDD");
  const fromDate = today;
  const toDate = today;

  const attendances = await Service.getAttendancesByStaffId(
    staff.id,
    fromDate,
    toDate
  ).catch((e) => {
    throw e;
  });

  if (!attendances || attendances.length === 0) {
    const createdAttendance = await Service.createAttendance(
      {
        staff_id: staff.id,
        work_date: now.format("YYYY-MM-DD"),
      },
      staff.id
    ).catch((e) => {
      throw e;
    });

    return createdAttendance;
  }

  return attendances[0];
}
