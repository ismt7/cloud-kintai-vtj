import { createAsyncThunk } from "@reduxjs/toolkit";

import { Attendance, AttendanceApi, Configuration } from "../../api";
// eslint-disable-next-line import/no-cycle
import { mappedOriginAttendance } from "../../components/time_recorder/TimeRecorderAPI";

export interface OriginAttendance
  extends Omit<Attendance, "workDate" | "startTime" | "endTime"> {
  workDate: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
}

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
