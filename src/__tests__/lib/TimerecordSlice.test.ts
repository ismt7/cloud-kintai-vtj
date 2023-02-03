import timeRecordReducer, {
  TimeRecordState,
  TimeRecordStatus,
} from "../../lib/timeRecordSlice";

describe("TimeRecordSlice", () => {
  const initialState: TimeRecordState = {
    attendanceData: undefined,
    restData: undefined,
    status: TimeRecordStatus.BEFORE_WORK,
    error: undefined,
  };

  test.concurrent("初期のステータス", () => {
    expect(timeRecordReducer(initialState, { type: "unknown" })).toEqual({
      attendanceData: undefined,
      restData: undefined,
      status: TimeRecordStatus.BEFORE_WORK,
      error: undefined,
    });
  });

  test.concurrent("勤務開始", () => {
    const actual = timeRecordReducer(initialState, {
      type: "timeRecord/clockIn",
      payload: undefined,
    });
    expect(actual.attendanceData?.start_time).not.toBeUndefined();
    expect(actual.status).toEqual(TimeRecordStatus.WORKING);
  });

  test.concurrent("勤務開始(二重打刻)", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: new Date(),
          end_time: undefined,
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: undefined,
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/clockIn",
        payload: undefined,
      }
    );
    expect(actual.status).toEqual(TimeRecordStatus.ERROR);
  });

  test.concurrent("勤務終了", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: new Date(),
          end_time: undefined,
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: undefined,
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/clockOut",
        payload: undefined,
      }
    );
    expect(actual.attendanceData?.end_time).not.toBeUndefined();
    expect(actual.status).toEqual(TimeRecordStatus.LEFT_WORK);
  });

  test.concurrent("勤務終了(出勤打刻なし)", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: undefined,
          end_time: undefined,
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: undefined,
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/clockOut",
        payload: undefined,
      }
    );
    expect(actual.attendanceData?.end_time).toBeUndefined();
    expect(actual.status).toEqual(TimeRecordStatus.ERROR);
  });

  test.concurrent("勤務終了(二重打刻)", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: new Date(),
          end_time: new Date(),
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: undefined,
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/clockOut",
        payload: undefined,
      }
    );
    expect(actual.status).toEqual(TimeRecordStatus.ERROR);
  });

  test.concurrent("勤務終了(休憩中打刻)", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: new Date(),
          end_time: undefined,
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: {
          start_time: new Date(),
          end_time: undefined,
        },
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/clockOut",
        payload: undefined,
      }
    );
    expect(actual.status).toEqual(TimeRecordStatus.ERROR);
  });

  test.concurrent("直行", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: undefined,
          end_time: undefined,
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: undefined,
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/goDirect",
        payload: undefined,
      }
    );
    expect(actual.attendanceData?.start_time).not.toBeUndefined();
    expect(actual.attendanceData?.go_directly_flag).toBeTruthy();
    expect(actual.status).toEqual(TimeRecordStatus.WORKING);
  });

  test.concurrent("直行(出勤打刻済み)", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: new Date(),
          end_time: undefined,
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: undefined,
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/goDirect",
        payload: undefined,
      }
    );
    expect(actual.status).toEqual(TimeRecordStatus.ERROR);
  });

  test.concurrent("直帰(通常出勤)", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: new Date(),
          end_time: undefined,
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: undefined,
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/returnDirect",
        payload: undefined,
      }
    );
    expect(actual.attendanceData?.end_time).not.toBeNull();
    expect(actual.attendanceData?.return_directly_flag).toBeTruthy();
    expect(actual.status).toEqual(TimeRecordStatus.LEFT_WORK);
  });

  test.concurrent("直帰(出勤なし)", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: undefined,
          end_time: undefined,
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: undefined,
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/returnDirect",
        payload: undefined,
      }
    );
    expect(actual.status).toEqual(TimeRecordStatus.ERROR);
  });

  test.concurrent("直帰(退勤済み)", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: new Date(),
          end_time: new Date(),
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: undefined,
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/returnDirect",
        payload: undefined,
      }
    );
    expect(actual.status).toEqual(TimeRecordStatus.ERROR);
  });

  test.concurrent("休憩開始", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: new Date(),
          end_time: undefined,
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: undefined,
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/startRest",
        payload: undefined,
      }
    );
    expect(actual.restData?.start_time).not.toBeNull();
    expect(actual.status).toEqual(TimeRecordStatus.RESTING);
  });

  test.concurrent("休憩開始(退勤済み)", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: new Date(),
          end_time: new Date(),
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: undefined,
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/startRest",
        payload: undefined,
      }
    );
    expect(actual.status).toEqual(TimeRecordStatus.ERROR);
  });

  test.concurrent("休憩終了", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: new Date(),
          end_time: undefined,
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: {
          start_time: new Date(),
          end_time: undefined,
        },
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/endRest",
        payload: undefined,
      }
    );
    expect(actual.restData).not.toEqual(undefined);
    expect(actual.restData?.end_time).not.toBeNull();
    expect(actual.status).toEqual(TimeRecordStatus.WORKING);
  });

  test.concurrent("休憩終了(休憩なし)", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: new Date(),
          end_time: undefined,
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: undefined,
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/endRest",
        payload: undefined,
      }
    );
    expect(actual.status).toEqual(TimeRecordStatus.ERROR);
  });

  test.concurrent("休憩終了(休憩なし/null)", () => {
    const actual = timeRecordReducer(
      {
        attendanceData: {
          start_time: new Date(),
          end_time: undefined,
          go_directly_flag: false,
          return_directly_flag: false,
        },
        restData: {
          start_time: undefined,
          end_time: undefined,
        },
        status: TimeRecordStatus.BEFORE_WORK,
      },
      {
        type: "timeRecord/endRest",
        payload: undefined,
      }
    );
    expect(actual.status).toEqual(TimeRecordStatus.ERROR);
  });
});
