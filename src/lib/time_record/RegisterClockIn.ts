import { createAsyncThunk } from "@reduxjs/toolkit";
import { AttendanceApi, Configuration } from "../../api";
import { mappedOriginAttendance } from "./FetchAttendance";

const registerClockIn = createAsyncThunk(
  "timeRecord/registerClockIn",
  async ({
    staffId,
    workDate,
    startTime,
    goDirectlyFlag,
  }: {
    staffId: number | undefined;
    workDate: number;
    startTime: string;
    goDirectlyFlag: boolean;
  }) => {
    if (!staffId) return null;

    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });
    const attendanceApi = new AttendanceApi(conf);
    const attendance = await attendanceApi
      .registerClockInAttendancesStaffIdWorkDateClockInPost({
        staffId,
        workDate,
        attendanceClockIn: {
          startTime,
          goDirectlyFlag,
        },
      })
      .then((r) => r)
      .catch(() => null);

    if (attendance === null) return null;

    return mappedOriginAttendance(attendance);
  }
);
export default registerClockIn;
