import { configureStore } from "@reduxjs/toolkit";
import { cleanup } from "@testing-library/react";
import {
  AttendanceStatus,
  testAttendanceSlice,
} from "../../../../lib/reducers/attendanceReducer";
import {
  RestStatus,
  testRestSlice,
} from "../../../../lib/reducers/restReducer";
import {
  StaffStatus,
  testLoginStaffReducer,
} from "../../../../lib/reducers/loginStaffReducer";
import {
  testTimeRecordSlice,
  TimeRecordStatus,
  TimeRecordStatusText,
} from "../../../../lib/reducers/timeRecordSlice";
import getTimeRecordStatus from "../../../../lib/time_record/getTimeRecordStatus";

afterEach(() => {
  cleanup();
});

describe("Attendance", () => {
  test.concurrent("未処理", async () => {
    const store = configureStore({
      reducer: {
        timeRecordReducer: testTimeRecordSlice({
          status: TimeRecordStatus.PROCESSING,
          statusText: TimeRecordStatusText.PROCESSING,
        }),
        loginStaffReducer: testLoginStaffReducer({
          status: StaffStatus.DONE,
          data: undefined,
        }),
        attendanceReducer: testAttendanceSlice({
          status: AttendanceStatus.NOT_PROCESSING,
          data: null,
        }),
        restReducer: testRestSlice({
          status: RestStatus.DONE,
          data: null,
        }),
      },
    });

    const beforeState = store.getState();
    void (await store.dispatch(
      getTimeRecordStatus({
        staff: beforeState.loginStaffReducer,
        attendance: beforeState.attendanceReducer,
        rest: beforeState.restReducer,
      })
    ));
    const afterState = store.getState();

    expect(afterState.timeRecordReducer.status).toBe(
      TimeRecordStatus.PROCESSING
    );
    expect(afterState.timeRecordReducer.statusText).toBe(
      TimeRecordStatusText.PROCESSING
    );
  });

  test.concurrent("処理中", async () => {
    const store = configureStore({
      reducer: {
        timeRecordReducer: testTimeRecordSlice({
          status: TimeRecordStatus.PROCESSING,
          statusText: TimeRecordStatusText.PROCESSING,
        }),
        loginStaffReducer: testLoginStaffReducer({
          status: StaffStatus.DONE,
          data: undefined,
        }),
        attendanceReducer: testAttendanceSlice({
          status: AttendanceStatus.PROCESSING,
          data: null,
        }),
        restReducer: testRestSlice({
          status: RestStatus.DONE,
          data: null,
        }),
      },
    });

    const beforeState = store.getState();
    void (await store.dispatch(
      getTimeRecordStatus({
        staff: beforeState.loginStaffReducer,
        attendance: beforeState.attendanceReducer,
        rest: beforeState.restReducer,
      })
    ));
    const afterState = store.getState();

    expect(afterState.timeRecordReducer.status).toBe(
      TimeRecordStatus.PROCESSING
    );
    expect(afterState.timeRecordReducer.statusText).toBe(
      TimeRecordStatusText.PROCESSING
    );
  });

  test.concurrent("エラー", async () => {
    const store = configureStore({
      reducer: {
        timeRecordReducer: testTimeRecordSlice({
          status: TimeRecordStatus.PROCESSING,
          statusText: TimeRecordStatusText.PROCESSING,
        }),
        loginStaffReducer: testLoginStaffReducer({
          status: StaffStatus.DONE,
          data: undefined,
        }),
        attendanceReducer: testAttendanceSlice({
          status: AttendanceStatus.ERROR,
          data: null,
        }),
        restReducer: testRestSlice({
          status: RestStatus.DONE,
          data: null,
        }),
      },
    });

    const beforeState = store.getState();
    void (await store.dispatch(
      getTimeRecordStatus({
        staff: beforeState.loginStaffReducer,
        attendance: beforeState.attendanceReducer,
        rest: beforeState.restReducer,
      })
    ));
    const afterState = store.getState();

    expect(afterState.timeRecordReducer.status).toBe(TimeRecordStatus.ERROR);
    expect(afterState.timeRecordReducer.statusText).toBe(
      TimeRecordStatusText.ERROR
    );
  });
});
