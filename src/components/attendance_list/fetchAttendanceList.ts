import dayjs from "dayjs";
import { Attendance, Rest, Service, Staff } from "../../client";

export interface AttendanceOrigin {
  id: Attendance["id"];
  workDate: Attendance["work_date"];
  startTime: Attendance["start_time"];
  endTime: Attendance["end_time"];
  remarks: Attendance["remarks"];
  createdAt: Attendance["created_at"];
  updatedAt: Attendance["updated_at"];
  rests: Rest[];
}

async function fetchAttendanceList(staff: Staff): Promise<AttendanceOrigin[]> {
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

  return attendances.map(
    (attendance): AttendanceOrigin => ({
      id: attendance.id,
      workDate: attendance.work_date,
      startTime: attendance.start_time,
      endTime: attendance.end_time,
      remarks: attendance.remarks,
      createdAt: attendance.created_at,
      updatedAt: attendance.updated_at,
      rests: rests.filter((rest) => rest.work_date === attendance.work_date),
    })
  );
}

export default fetchAttendanceList;
