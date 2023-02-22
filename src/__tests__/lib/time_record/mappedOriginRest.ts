import { cleanup } from "@testing-library/react";
import dayjs from "dayjs";
import { mappedOriginRest } from "../../../lib/time_record/FetchRest";

afterEach(() => {
  cleanup();
});

describe("mappedOriginRest", () => {
  test.concurrent("正常", () => {
    const now = dayjs();
    const res = mappedOriginRest({
      restTimeId: 1,
      staffId: 1,
      workDate: now.toDate(),
      startTime: now.toDate(),
      endTime: now.toDate(),
    });

    expect(res).toEqual({
      restTimeId: 1,
      staffId: 1,
      workDate: now.toISOString(),
      startTime: now.toISOString(),
      endTime: now.toISOString(),
    });
  });

  test.concurrent("異常(Date Null)", () => {
    const date = dayjs(0);
    const res = mappedOriginRest({
      restTimeId: 1,
      staffId: 1,
      workDate: date.toDate(),
      startTime: date.toDate(),
      endTime: date.toDate(),
    });

    expect(res).toEqual({
      restTimeId: 1,
      staffId: 1,
      workDate: undefined,
      startTime: undefined,
      endTime: undefined,
    });
  });
});
