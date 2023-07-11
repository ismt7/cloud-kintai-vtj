import { configureStore } from "@reduxjs/toolkit";

import {
  AttendanceStatus,
  testAttendanceSlice,
} from "../../../lib/reducers/attendanceReducer";
import {
  LoginStaffStatus,
  testLoginStaffReducer,
} from "../../../lib/reducers/loginStaffReducer";
import { RestStatus, testRestSlice } from "../../../lib/reducers/restReducer";
import {
  StaffListStatus,
  testStaffListReducer,
} from "../../../lib/reducers/staffListReducer";
import {
  TimeRecordListStatus,
  testTimeRecordListSlice,
} from "../../../lib/reducers/timeRecordListReducer";
import {
  TimeRecordStatus,
  TimeRecordStatusText,
  testTimeRecordSlice,
} from "../../../lib/reducers/timeRecordSlice";

import { GetStaff, StaffRole } from "./CommonMock";

export const GetStoreMockForSystemAdminCreateStaff = configureStore({
  reducer: {
    timeRecordReducer: testTimeRecordSlice({
      status: TimeRecordStatus.PROCESSING,
      statusText: TimeRecordStatusText.PROCESSING,
    }),
    loginStaffReducer: testLoginStaffReducer({
      status: LoginStaffStatus.DONE,
      data: GetStaff(StaffRole.SYSTEM_ADMIN),
    }),
    staffListReducer: testStaffListReducer({
      status: StaffListStatus.DONE,
      data: [],
    }),
    attendanceReducer: testAttendanceSlice({
      status: AttendanceStatus.DONE,
      data: null,
    }),
    restReducer: testRestSlice({
      status: RestStatus.DONE,
      data: null,
    }),
    timeRecordListReducer: testTimeRecordListSlice({
      status: TimeRecordListStatus.DONE,
      data: [],
    }),
  },
});

export const GetStoreMockForSystemAdminUpdateStaff = configureStore({
  reducer: {
    timeRecordReducer: testTimeRecordSlice({
      status: TimeRecordStatus.PROCESSING,
      statusText: TimeRecordStatusText.PROCESSING,
    }),
    loginStaffReducer: testLoginStaffReducer({
      status: LoginStaffStatus.DONE,
      data: GetStaff(StaffRole.SYSTEM_ADMIN),
    }),
    staffListReducer: testStaffListReducer({
      status: StaffListStatus.DONE,
      data: [],
      selectedData: GetStaff(StaffRole.STAFF),
    }),
    attendanceReducer: testAttendanceSlice({
      status: AttendanceStatus.DONE,
      data: null,
    }),
    restReducer: testRestSlice({
      status: RestStatus.DONE,
      data: null,
    }),
    timeRecordListReducer: testTimeRecordListSlice({
      status: TimeRecordListStatus.PROCESSING,
      data: [],
    }),
  },
});
