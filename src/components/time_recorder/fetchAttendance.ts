import dayjs from "dayjs";
import { Attendance, Service, Staff } from "../../client";

async function fetchAttendance(
  staff: Staff,
  callback: (value: Attendance | null) => void
) {
  const now = dayjs();
  const today = now.format("YYYYMMDD");
  const fromDate = today;
  const toDate = today;

  const attendances = await Service.getAttendancesByStaffId(
    staff.id,
    fromDate,
    toDate
  ).catch((error) => {
    console.log(error);
    return null;
  });

  if (!attendances || attendances.length === 0) {
    const createdAttendance = await Service.createAttendance(
      {
        staff_id: staff.id,
        work_date: now.format("YYYY-MM-DD"),
      },
      staff.id
    ).catch((error) => {
      console.log(error);
      return null;
    });

    callback(createdAttendance);
    return;
  }

  callback(attendances[0]);
}

export default fetchAttendance;
