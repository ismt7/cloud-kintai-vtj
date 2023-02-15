import { configureStore } from "@reduxjs/toolkit";
import timeRecordReducer from "./reducers/timeRecordSlice";
import staffReducer from "./reducers/staffSlice";
import attendanceReducer from "./reducers/attendanceReducer";
import restReducer from "./reducers/restReducer";
import timeRecordListReducer from "./reducers/timeRecordListReducer";

export const store = configureStore({
  reducer: {
    timeRecordReducer,
    staffReducer,
    attendanceReducer,
    restReducer,
    timeRecordListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const selectStaff = (state: RootState) => state.staffReducer;
export const selectAttendance = (state: RootState) => state.attendanceReducer;
export const selectRest = (state: RootState) => state.restReducer;
export const selectTimeRecord = (state: RootState) => state.timeRecordReducer;
export const selectTimeRecordList = (state: RootState) =>
  state.timeRecordListReducer;
