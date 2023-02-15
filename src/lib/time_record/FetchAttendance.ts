import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { Attendance, AttendanceApi, Configuration } from "../../api";

export interface OriginAttendance
  extends Omit<Attendance, "workDate" | "startTime" | "endTime"> {
  workDate: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
}

const isNullDate = (date: Date) => {
  const nullDate = dayjs(0);
  const targetDate = dayjs(date);

  return nullDate.isSame(targetDate);
};

export const mappedOriginAttendance = (
  attendance: Attendance
): OriginAttendance => ({
  attendanceId: attendance.attendanceId,
  parentAttendanceId: attendance.parentAttendanceId,
  staffId: attendance.staffId,
  workDate: isNullDate(attendance.workDate)
    ? undefined
    : dayjs(attendance.workDate).toISOString(),
  startTime: isNullDate(attendance.startTime)
    ? undefined
    : dayjs(attendance.startTime).toISOString(),
  endTime: isNullDate(attendance.endTime)
    ? undefined
    : dayjs(attendance.endTime).toISOString(),
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
      .getAttendance({
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
