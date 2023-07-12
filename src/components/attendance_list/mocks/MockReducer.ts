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
  TimeRecordListStatus,
  testTimeRecordListSlice,
} from "../../../lib/reducers/timeRecordListReducer";
import {
  TimeRecordStatus,
  TimeRecordStatusText,
  testTimeRecordSlice,
} from "../../../lib/reducers/timeRecordSlice";

export default function GetStoreMock() {
  return configureStore({
    reducer: {
      timeRecordReducer: testTimeRecordSlice({
        status: TimeRecordStatus.PROCESSING,
        statusText: TimeRecordStatusText.PROCESSING,
      }),
      loginStaffReducer: testLoginStaffReducer({
        status: LoginStaffStatus.DONE,
        data: {
          staffId: 999,
          lastName: "田中",
          firstName: "太郎",
          mailAddress: "tanaka@example.com",
          iconPath: "",
          staffRoles: {
            roleId: 2,
            staffId: 999,
            role: {
              roleName: "スタッフ",
            },
          },
        },
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
}
