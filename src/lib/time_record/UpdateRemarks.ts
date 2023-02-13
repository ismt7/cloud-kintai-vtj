import { createAsyncThunk } from "@reduxjs/toolkit";
import { AttendanceApi, Configuration } from "../../api";
import { mappedOriginAttendance } from "./FetchAttendance";

const updateRemarks = createAsyncThunk(
  "timeRecord/updateRemarks",
  async ({
    staffId,
    workDate,
    remarks,
  }: {
    staffId: number | undefined;
    workDate: number;
    remarks: string;
  }) => {
    if (!staffId) return null;

    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });
    const attendanceApi = new AttendanceApi(conf);
    const attendance = await attendanceApi
      .registerRemarksAttendancesStaffIdWorkDateRemarksPatch({
        staffId,
        workDate,
        attendanceRemarks: {
          remarks,
        },
      })
      .then((r) => r)
      .catch(() => null);

    if (attendance === null) return null;

    return mappedOriginAttendance(attendance);
  }
);
export default updateRemarks;
