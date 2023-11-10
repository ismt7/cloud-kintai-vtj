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

export async function fetchAttendanceList(
  staff: Staff
): Promise<AttendanceOrigin[]> {
  const now = dayjs();
  const today = now.format("YYYYMMDD");
  const fromDate = now.subtract(30, "day").format("YYYYMMDD");
  const toDate = today;
  const dateList = Array.from({ length: 30 }, (_, i) =>
    now.subtract(i, "day").format("YYYY-MM-DD")
  ).sort();

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

  return dateList.map((targetDate): AttendanceOrigin => {
    const targetAttendance = attendances.find(
      (attendance) => attendance.work_date === targetDate
    );
    const targetRest = rests.find((rest) => rest.work_date === targetDate);

    return {
      id: targetAttendance?.id ?? 0,
      workDate: targetAttendance?.work_date ?? targetDate,
      startTime: targetAttendance?.start_time ?? "",
      endTime: targetAttendance?.end_time ?? "",
      remarks: targetAttendance?.remarks ?? "",
      createdAt: targetAttendance?.created_at ?? "",
      updatedAt: targetAttendance?.updated_at ?? "",
      rests: targetRest ? [targetRest] : [],
    };
  });
}
