import dayjs from "dayjs";
import { Service, Staff } from "../../client";

export default async function createAttendanceData(staff: Staff) {
  const now = dayjs();
  const attendance = await Service.createAttendance(
    {
      staff_id: staff.id,
      work_date: now.format("YYYY-MM-DD"),
    },
    staff.id
  ).catch((e) => {
    throw e;
  });

  return attendance;
}
