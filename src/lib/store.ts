// cspell:words reduxjs
import { configureStore } from "@reduxjs/toolkit";

import jobTermReducer from "../components/job_term/reducers/jobTermReducer";
import loginStaffReducer from "./reducers/loginStaffReducer";
import staffListReducer from "./reducers/staffListReducer";
import staffReducer from "./reducers/staffReducer";
import staffRoleReducer from "./reducers/staffRoleReducer";
import timeRecordListReducer from "./reducers/timeRecordListReducer";

export const store = configureStore({
  reducer: {
    loginStaffReducer,
    staffReducer,
    staffRoleReducer,
    staffListReducer,
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
export const selectTimeRecordList = (state: RootState) =>
  state.timeRecordListReducer;
export const selectJobTermList = (state: RootState) => state.jobTermReducer;
