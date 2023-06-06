// cspell:words reduxjs
import { configureStore } from "@reduxjs/toolkit";

import attendanceReducer from "./reducers/attendanceReducer";
import jobTermReducer from "./reducers/jobTermReducer";
import loginStaffReducer from "./reducers/loginStaffReducer";
import restReducer from "./reducers/restReducer";
import staffListReducer from "./reducers/staffListReducer";
import staffReducer from "./reducers/staffReducer";
import staffRoleReducer from "./reducers/staffRoleReducer";
import timeRecordListReducer from "./reducers/timeRecordListReducer";
import timeRecordReducer from "./reducers/timeRecordSlice";

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
    jobTermReducer,
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
export const selectJobTermList = (state: RootState) => state.jobTermReducer;
