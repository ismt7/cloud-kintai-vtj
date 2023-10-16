import dayjs from "dayjs";
import { Service } from "../../client";

async function fetchAttendance(
  staffId: number,
  fromDate: dayjs.Dayjs,
  toDate: dayjs.Dayjs
) {
  const attendances = await Service.getAttendancesByStaffId(
    staffId,
    fromDate.format("YYYYMMDD"),
    toDate.format("YYYYMMDD")
  );

  if (attendances.length === 0) {
    throw new Error("No attendance data");
  }

  if (attendances.length > 1) {
    throw new Error("Too many attendance data");
  }

  return attendances[0];
}

export default fetchAttendance;
