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
  ).catch((error) => {
    throw error;
  });

  if (!attendances || attendances.length === 0 || attendances.length > 1) {
    throw new Error("Invalid attendance");
  }

  return attendances[0];
}

export default fetchAttendance;
