import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { AttendanceApi, Configuration } from "../../api";
import { mappedOriginAttendance } from "./FetchAttendance";

const registerClockOut = createAsyncThunk(
  "timeRecord/registerClockOut",
  async ({
    staffId,
    workDate,
    endTime,
    returnDirectlyFlag,
  }: {
    staffId: number | undefined;
    workDate: number;
    endTime: string;
    returnDirectlyFlag: boolean;
  }) => {
    if (!staffId) return null;

    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });
    const attendanceApi = new AttendanceApi(conf);
    const attendance = await attendanceApi
      .registerClockOut({
        staffId,
        workDate,
        attendanceClockOut: {
          endTime: dayjs(endTime).toDate(),
          returnDirectlyFlag,
        },
      })
      .then((r) => r)
      .catch(() => null);

    if (attendance === null) return null;

    return mappedOriginAttendance(attendance);
  }
);
export default registerClockOut;
