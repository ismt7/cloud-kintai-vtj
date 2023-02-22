import { configureStore } from "@reduxjs/toolkit";
import timeRecordReducer from "./reducers/timeRecordSlice";
import loginStaffReducer from "./reducers/loginStaffReducer";
import attendanceReducer from "./reducers/attendanceReducer";
import restReducer from "./reducers/restReducer";
import timeRecordListReducer from "./reducers/timeRecordListReducer";
import staffListReducer from "./reducers/staffListReducer";
import staffRoleReducer from "./reducers/staffRoleReducer";
import staffReducer from "./reducers/staffReducer";

export const store = configureStore({
  reducer: {
    timeRecordReducer,
    loginStaffReducer,
    staffReducer,
    staffRoleReducer,
    staffListReducer,
    attendanceReducer,
    restReducer,
    timeRecordListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const selectLoginStaff = (state: RootState) => state.loginStaffReducer;
export const selectStaff = (state: RootState) => state.staffReducer;
export const selectStaffRole = (state: RootState) => state.staffRoleReducer;
export const selectStaffList = (state: RootState) => state.staffListReducer;
export const selectAttendance = (state: RootState) => state.attendanceReducer;
export const selectRest = (state: RootState) => state.restReducer;
export const selectTimeRecord = (state: RootState) => state.timeRecordReducer;
export const selectTimeRecordList = (state: RootState) =>
  state.timeRecordListReducer;
