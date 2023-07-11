import { configureStore } from "@reduxjs/toolkit";
import {
  AttendanceDailyStatus,
  testAttendanceDailySlice,
} from "../attendanceDailySlice";

export default function GetStoreMock() {
  return configureStore({
    reducer: {
      attendanceDailyReducer: testAttendanceDailySlice({
        status: AttendanceDailyStatus.DONE,
        attendances: [],
        staffs: undefined,
      }).reducer,
    },
  });
}
