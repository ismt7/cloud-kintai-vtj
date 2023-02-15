import { configureStore } from "@reduxjs/toolkit";
import { cleanup } from "@testing-library/react";
import dayjs from "dayjs";
import {
  AttendanceStatus,
  testAttendanceSlice,
} from "../../../lib/reducers/attendanceReducer";
import { RestStatus, testRestSlice } from "../../../lib/reducers/restReducer";
import {
  StaffStatus,
  testStaffRecordSlice,
} from "../../../lib/reducers/staffSlice";
import {
  testTimeRecordSlice,
  TimeRecordStatus,
  TimeRecordStatusText,
} from "../../../lib/reducers/timeRecordSlice";
import { OriginAttendance } from "../../../lib/time_record/FetchAttendance";
import { OriginRest } from "../../../lib/time_record/FetchRest";
import getTimeRecordStatus from "../../../lib/time_record/getTimeRecordStatus";

afterEach(() => {
  cleanup();
});

describe("勤務前(成功)", () => {
  interface TableProp {
    attendance: OriginAttendance | null;
  }

  const table: TableProp[] = [
    { attendance: null },
    {
      attendance: {
        attendanceId: 0,
        parentAttendanceId: 0,
        staffId: 0,
        workDate: "",
        startTime: "",
        endTime: "",
        goDirectlyFlag: false,
        returnDirectlyFlag: false,
        remarks: "",
      },
    },
  ];
  test.concurrent.each(table)("Case", async ({ attendance }: TableProp) => {
    const store = configureStore({
      reducer: {
        timeRecordReducer: testTimeRecordSlice({
          status: TimeRecordStatus.PROCESSING,
          statusText: TimeRecordStatusText.PROCESSING,
        }),
        staffReducer: testStaffRecordSlice({
          status: StaffStatus.DONE,
          data: {
            staffId: 1,
            lastName: "田中",
            firstName: "太郎",
            mailAddress: "tanaka@example.com",
            iconPath: "",
          },
        }),
        attendanceReducer: testAttendanceSlice({
          status: AttendanceStatus.DONE,
          data: attendance,
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
      TimeRecordStatus.BEFORE_WORK
    );
    expect(afterState.timeRecordReducer.statusText).toBe(
      TimeRecordStatusText.BEFORE_WORK
    );
  });
});

describe("勤務中", () => {
  interface TableProp {
    attendance: OriginAttendance | null;
    rest: OriginRest | null;
  }

  const now = dayjs();

  const table: TableProp[] = [
    // 通常
    {
      attendance: {
        attendanceId: 1,
        parentAttendanceId: 0,
        staffId: 1,
        workDate: now.format("YYYYMMDD"),
        startTime: `${now.format("YYYY-MM-DD")}T09:00:00`,
        endTime: "",
        goDirectlyFlag: false,
        returnDirectlyFlag: false,
        remarks: "",
      },
      rest: null,
    },
    {
      attendance: {
        attendanceId: 1,
        parentAttendanceId: 0,
        staffId: 1,
        workDate: now.format("YYYYMMDD"),
        startTime: `${now.format("YYYY-MM-DD")}T09:00:00`,
        endTime: "",
        goDirectlyFlag: false,
        returnDirectlyFlag: false,
        remarks: "",
      },
      rest: {
        restTimeId: 1,
        staffId: 1,
        workDate: now.format("YYYYMMDD"),
        startTime: `${now.format("YYYY-MM-DD")}T12:00:00`,
        endTime: `${now.format("YYYY-MM-DD")}T13:00:00`,
      },
    },

    // 直行
    {
      attendance: {
        attendanceId: 1,
        parentAttendanceId: 0,
        staffId: 1,
        workDate: dayjs().format("YYYYMMDD"),
        startTime: `${now.format("YYYY-MM-DD")}T09:00:00`,
        endTime: "",
        goDirectlyFlag: true,
        returnDirectlyFlag: false,
        remarks: "",
      },
      rest: null,
    },
  ];
  test.concurrent.each(table)(
    "Case %o",
    async ({ attendance, rest }: TableProp) => {
      const store = configureStore({
        reducer: {
          timeRecordReducer: testTimeRecordSlice({
            status: TimeRecordStatus.PROCESSING,
            statusText: TimeRecordStatusText.PROCESSING,
          }),
          staffReducer: testStaffRecordSlice({
            status: StaffStatus.DONE,
            data: {
              staffId: 1,
              lastName: "田中",
              firstName: "太郎",
              mailAddress: "tanaka@example.com",
              iconPath: "",
            },
          }),
          attendanceReducer: testAttendanceSlice({
            status: AttendanceStatus.DONE,
            data: attendance,
          }),
          restReducer: testRestSlice({
            status: RestStatus.DONE,
            data: rest,
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
        TimeRecordStatus.WORKING
      );
      expect(afterState.timeRecordReducer.statusText).toBe(
        TimeRecordStatusText.WORKING
      );
    }
  );
});

describe("勤務終了", () => {
  interface TableProp {
    attendance: OriginAttendance | null;
  }

  const table: TableProp[] = [
    // 通常
    {
      attendance: {
        attendanceId: 0,
        parentAttendanceId: 0,
        staffId: 1,
        workDate: dayjs().format("YYYYMMDD"),
        startTime: "09:00:00",
        endTime: "18:00:00",
        goDirectlyFlag: false,
        returnDirectlyFlag: false,
        remarks: "",
      },
    },

    // 直帰
    {
      attendance: {
        attendanceId: 0,
        parentAttendanceId: 0,
        staffId: 1,
        workDate: dayjs().format("YYYYMMDD"),
        startTime: "09:00:00",
        endTime: "18:00:00",
        goDirectlyFlag: false,
        returnDirectlyFlag: true,
        remarks: "",
      },
    },
  ];
  test.concurrent.each(table)("Case %o", async ({ attendance }: TableProp) => {
    const store = configureStore({
      reducer: {
        timeRecordReducer: testTimeRecordSlice({
          status: TimeRecordStatus.PROCESSING,
          statusText: TimeRecordStatusText.PROCESSING,
        }),
        staffReducer: testStaffRecordSlice({
          status: StaffStatus.DONE,
          data: {
            staffId: 1,
            lastName: "田中",
            firstName: "太郎",
            mailAddress: "tanaka@example.com",
            iconPath: "",
          },
        }),
        attendanceReducer: testAttendanceSlice({
          status: AttendanceStatus.DONE,
          data: attendance,
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
      TimeRecordStatus.LEFT_WORK
    );
    expect(afterState.timeRecordReducer.statusText).toBe(
      TimeRecordStatusText.LEFT_WORK
    );
  });
});

describe("休憩開始", () => {
  interface TableProp {
    attendance: OriginAttendance | null;
    rest: OriginRest | null;
  }

  const table: TableProp[] = [
    {
      attendance: {
        attendanceId: 0,
        parentAttendanceId: 0,
        staffId: 1,
        workDate: dayjs().format("YYYYMMDD"),
        startTime: "09:00:00",
        endTime: "",
        goDirectlyFlag: false,
        returnDirectlyFlag: false,
        remarks: "",
      },
      rest: {
        restTimeId: 1,
        staffId: 1,
        workDate: dayjs().format("YYYYMMDD"),
        startTime: "12:00:00",
        endTime: "",
      },
    },
  ];
  test.concurrent.each(table)(
    "Case %o",
    async ({ attendance, rest }: TableProp) => {
      const store = configureStore({
        reducer: {
          timeRecordReducer: testTimeRecordSlice({
            status: TimeRecordStatus.PROCESSING,
            statusText: TimeRecordStatusText.PROCESSING,
          }),
          staffReducer: testStaffRecordSlice({
            status: StaffStatus.DONE,
            data: {
              staffId: 1,
              lastName: "田中",
              firstName: "太郎",
              mailAddress: "tanaka@example.com",
              iconPath: "",
            },
          }),
          attendanceReducer: testAttendanceSlice({
            status: AttendanceStatus.DONE,
            data: attendance,
          }),
          restReducer: testRestSlice({
            status: RestStatus.DONE,
            data: rest,
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
        TimeRecordStatus.RESTING
      );
      expect(afterState.timeRecordReducer.statusText).toBe(
        TimeRecordStatusText.RESTING
      );
    }
  );
});

describe("休憩終了", () => {
  interface TableProp {
    attendance: OriginAttendance | null;
    rest: OriginRest | null;
  }

  const table: TableProp[] = [
    {
      attendance: {
        attendanceId: 0,
        parentAttendanceId: 0,
        staffId: 1,
        workDate: dayjs().format("YYYYMMDD"),
        startTime: "09:00:00",
        endTime: "",
        goDirectlyFlag: false,
        returnDirectlyFlag: false,
        remarks: "",
      },
      rest: {
        restTimeId: 1,
        staffId: 1,
        workDate: dayjs().format("YYYYMMDD"),
        startTime: "12:00:00",
        endTime: "13:00:00",
      },
    },
  ];
  test.concurrent.each(table)(
    "Case %o",
    async ({ attendance, rest }: TableProp) => {
      const store = configureStore({
        reducer: {
          timeRecordReducer: testTimeRecordSlice({
            status: TimeRecordStatus.PROCESSING,
            statusText: TimeRecordStatusText.PROCESSING,
          }),
          staffReducer: testStaffRecordSlice({
            status: StaffStatus.DONE,
            data: {
              staffId: 1,
              lastName: "田中",
              firstName: "太郎",
              mailAddress: "tanaka@example.com",
              iconPath: "",
            },
          }),
          attendanceReducer: testAttendanceSlice({
            status: AttendanceStatus.DONE,
            data: attendance,
          }),
          restReducer: testRestSlice({
            status: RestStatus.DONE,
            data: rest,
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
        TimeRecordStatus.WORKING
      );
      expect(afterState.timeRecordReducer.statusText).toBe(
        TimeRecordStatusText.WORKING
      );
    }
  );
});
