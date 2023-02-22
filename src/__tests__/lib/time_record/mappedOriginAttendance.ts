import { cleanup } from "@testing-library/react";
import dayjs from "dayjs";
import { mappedOriginAttendance } from "../../../lib/time_record/FetchAttendance";

afterEach(() => {
  cleanup();
});

describe("mappedOriginAttendance", () => {
  test.concurrent("正常", () => {
    const now = dayjs();
    const res = mappedOriginAttendance({
      attendanceId: 1,
      parentAttendanceId: 0,
      staffId: 1,
      workDate: now.toDate(),
      startTime: now.toDate(),
      endTime: now.toDate(),
      goDirectlyFlag: false,
      returnDirectlyFlag: false,
      remarks: "テスト",
    });

    expect(res).toEqual({
      attendanceId: 1,
      parentAttendanceId: 0,
      staffId: 1,
      workDate: now.toISOString(),
      startTime: now.toISOString(),
      endTime: now.toISOString(),
      goDirectlyFlag: false,
      returnDirectlyFlag: false,
      remarks: "テスト",
    });
  });

  test.concurrent("異常(Date Null)", () => {
    const date = dayjs(0);
    const res = mappedOriginAttendance({
      attendanceId: 1,
      parentAttendanceId: 0,
      staffId: 1,
      workDate: date.toDate(),
      startTime: date.toDate(),
      endTime: date.toDate(),
      goDirectlyFlag: false,
      returnDirectlyFlag: false,
      remarks: "テスト",
    });

    expect(res).toEqual({
      attendanceId: 1,
      parentAttendanceId: 0,
      staffId: 1,
      workDate: undefined,
      startTime: undefined,
      endTime: undefined,
      goDirectlyFlag: false,
      returnDirectlyFlag: false,
      remarks: "テスト",
    });
  });
});
