import dayjs from "dayjs";
import { Service, Staff } from "../../client";

async function fetchAttendanceList(staff: Staff) {
  const now = dayjs();
  const today = now.format("YYYYMMDD");
  const fromDate = now.subtract(30, "day").format("YYYYMMDD");
  const toDate = today;

  const { id: staffId } = staff;
  const attendances = await Service.getAttendancesByStaffId(
    staffId,
    fromDate,
    toDate
  ).catch((error) => {
    throw error;
  });

  const rests = await Service.getRestsByStaffId(
    staffId,
    fromDate,
    toDate
  ).catch((error) => {
    throw error;
  });

  return attendances.map((attendance) => ({
    id: attendance.id,
    workDate: attendance.work_date,
    startTime: attendance.start_time,
    endTime: attendance.end_time,
    remarks: attendance.remarks,
    rests: rests.filter((rest) => rest.work_date === attendance.work_date),
  }));
}

export default fetchAttendanceList;
