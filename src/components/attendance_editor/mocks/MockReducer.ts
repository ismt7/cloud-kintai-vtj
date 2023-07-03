import { configureStore } from "@reduxjs/toolkit";
import {
  AttendanceEditorStatus,
  testAttendanceEditorSlice,
} from "../attendanceEditorSlice";

export default function GetStoreMock() {
  return configureStore({
    reducer: {
      attendanceEditorReducer: testAttendanceEditorSlice({
        status: AttendanceEditorStatus.NOT_PROCESSING,
        staff: undefined,
        attendance: undefined,
        rests: undefined,
      }),
    },
  });
}
