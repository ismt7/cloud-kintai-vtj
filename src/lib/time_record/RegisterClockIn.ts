import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { AttendanceApi, Configuration } from "../../api";
import { mappedOriginAttendance } from "../../components/time_recorder/TimeRecorderAPI";

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
      .registerClockIn({
        staffId,
        workDate,
        attendanceClockIn: {
          startTime: dayjs(startTime).toDate(),
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
