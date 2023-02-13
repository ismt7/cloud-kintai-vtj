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
  testStaffRecordSlice,
} from "../../../../lib/reducers/staffSlice";
import {
  testTimeRecordSlice,
  TimeRecordStatus,
  TimeRecordStatusText,
} from "../../../../lib/reducers/timeRecordSlice";
import getTimeRecordStatus from "../../../../lib/time_record/getTimeRecordStatus";

afterEach(() => {
  cleanup();
});

describe("Staff", () => {
  test.concurrent("未処理", async () => {
    const store = configureStore({
      reducer: {
        timeRecordReducer: testTimeRecordSlice({
          status: TimeRecordStatus.PROCESSING,
          statusText: TimeRecordStatusText.PROCESSING,
        }),
        staffReducer: testStaffRecordSlice({
          status: StaffStatus.NOT_PROCESSING,
          data: null,
        }),
        attendanceReducer: testAttendanceSlice({
          status: AttendanceStatus.DONE,
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
        staff: beforeState.staffReducer,
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
        staffReducer: testStaffRecordSlice({
          status: StaffStatus.PROCESSING,
          data: null,
        }),
        attendanceReducer: testAttendanceSlice({
          status: AttendanceStatus.DONE,
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
        staff: beforeState.staffReducer,
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
        staffReducer: testStaffRecordSlice({
          status: StaffStatus.ERROR,
          data: null,
        }),
        attendanceReducer: testAttendanceSlice({
          status: AttendanceStatus.DONE,
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
        staff: beforeState.staffReducer,
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
