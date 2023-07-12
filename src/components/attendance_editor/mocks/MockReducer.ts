import { configureStore } from "@reduxjs/toolkit";
import {
  AttendanceEditorStatus,
  testAttendanceEditorSlice,
} from "../attendanceEditorSlice";

const testReducer = testAttendanceEditorSlice({
  status: AttendanceEditorStatus.NOT_PROCESSING,
  staff: undefined,
  attendance: undefined,
  rests: undefined,
});

export default function GetStoreMock() {
  return configureStore({
    reducer: {
      attendanceEditorReducer: testReducer.reducer,
    },
  });
}

export const { updateAttendance, updateRests } = testReducer.actions;
