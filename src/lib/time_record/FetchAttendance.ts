import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { Attendance, AttendanceApi, Configuration } from "../../api";

export interface OriginAttendance extends Omit<Attendance, "workDate"> {
  workDate: string;
}

export const mappedOriginAttendance = (
  attendance: Attendance
): OriginAttendance => ({
  attendanceId: attendance.attendanceId,
  parentAttendanceId: attendance.parentAttendanceId,
  staffId: attendance.staffId,
  workDate: dayjs(attendance.workDate).format("YYYYMMDD"),
  startTime: attendance.startTime || "",
  endTime: attendance.endTime || "",
  goDirectlyFlag: attendance.goDirectlyFlag,
  returnDirectlyFlag: attendance.returnDirectlyFlag,
  remarks: attendance.remarks,
});

const fetchAttendance = createAsyncThunk(
  "timeRecord/fetchAttendance",
  async ({ staffId, workDate }: { staffId: number; workDate: number }) => {
    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });

    const api = new AttendanceApi(conf);
    const attendance = await api
      .readAttendancesAttendancesStaffIdWorkDateGet({
        staffId,
        workDate,
      })
      .then((r) => r)
      .catch(() => null);

    if (attendance?.staffId === undefined) return null;

    if (attendance === null) return null;

    return mappedOriginAttendance(attendance);
  }
);
export default fetchAttendance;
