import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-cycle
import timeRecorderReducer from "../components/time_recorder/TimeRecorderSlice";
// eslint-disable-next-line import/no-cycle
import attendanceReducer from "../lib/reducers/attendanceReducer";
// eslint-disable-next-line import/no-cycle
import jobTermReducer from "../lib/reducers/jobTermReducer";
// eslint-disable-next-line import/no-cycle
import loginStaffReducer from "../lib/reducers/loginStaffReducer";
// eslint-disable-next-line import/no-cycle
import restReducer from "../lib/reducers/restReducer";
// eslint-disable-next-line import/no-cycle
import staffListReducer from "../lib/reducers/staffListReducer";
// eslint-disable-next-line import/no-cycle
import staffReducer from "../lib/reducers/staffReducer";
// eslint-disable-next-line import/no-cycle
import staffRoleReducer from "../lib/reducers/staffRoleReducer";
// eslint-disable-next-line import/no-cycle
import attendanceEditorReducer from "../components/attendance_editor/attendanceEditorSlice";
// eslint-disable-next-line import/no-cycle
import timeRecordListReducer from "../lib/reducers/timeRecordListReducer";

export const store = configureStore({
  reducer: {
    timeRecorderReducer,
    loginStaffReducer,
    staffReducer,
    staffRoleReducer,
    staffListReducer,
    attendanceReducer,
    attendanceEditorReducer,
    restReducer,
    timeRecordListReducer,
    jobTermReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
