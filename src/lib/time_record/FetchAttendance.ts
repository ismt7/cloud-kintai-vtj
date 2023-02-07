import { createAsyncThunk } from "@reduxjs/toolkit";
import { AttendanceApi, Configuration } from "../../api";

const fetchAttendance = createAsyncThunk(
  "timeRecord/fetchAttendance",
  async ({ staffId, workDate }: { staffId: number; workDate: number }) => {
    const conf = new Configuration({
      basePath: process.env.BASE_PATH,
    });
    const attendanceApi = new AttendanceApi(conf);
    const attendance = await attendanceApi
      .readAttendancesAttendancesStaffIdWorkDateGet({
        staffId,
        workDate,
      })
      .then((r) => r)
      .catch(() => undefined);

    return attendance;
  }
);
export default fetchAttendance;
