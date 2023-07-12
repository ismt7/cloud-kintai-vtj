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
  testTimeRecorderSlice,
  TimeRecorderStatus,
} from "../TimeRecorderSlice";
import { WorkStatusCodes, WorkStatusTexts } from "../WorkStatusCodes";

export default function GetStoreMock() {
  return configureStore({
    reducer: {
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
      timeRecorderReducer: testTimeRecorderSlice({
        status: TimeRecorderStatus.NOT_PROCESSING,
        workStatus: {
          code: WorkStatusCodes.PROCESSING,
          text: WorkStatusTexts.PROCESSING,
        },
        data: {
          attendance: null,
          rest: null,
        },
      }),
    },
  });
}
