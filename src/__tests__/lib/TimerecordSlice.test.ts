import timeRecordReducer, {
  TimeRecordState,
  TimeRecordStatus,
} from "../../lib/timeRecordSlice";

describe("TimeRecordSlice", () => {
  const initialState: TimeRecordState = {
    workStart: null,
    workEnd: null,
    goDirect: false,
    returnDirect: false,
    status: TimeRecordStatus.BEFORE_WORK,
    rests: [],
  };

  test.concurrent("初期のステータス", () => {
    expect(timeRecordReducer(initialState, { type: "unknown" })).toEqual({
      workStart: null,
      workEnd: null,
      goDirect: false,
      returnDirect: false,
      status: TimeRecordStatus.BEFORE_WORK,
      rests: [],
    });
  });

  test.concurrent("勤務開始", () => {
    const actual = timeRecordReducer(initialState, {
      type: "timeRecord/clockIn",
      payload: undefined,
    });
    expect(actual.workStart).not.toBeNull();
    expect(actual.status).toEqual(TimeRecordStatus.WORKING);
  });

  test.concurrent("勤務開始(二重打刻)", () => {
    const actual = timeRecordReducer(
      {
        workStart: new Date(),
        workEnd: null,
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [],
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
        workStart: new Date(),
        workEnd: null,
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [],
      },
      {
        type: "timeRecord/clockOut",
        payload: undefined,
      }
    );
    expect(actual.workEnd).not.toBeNull();
    expect(actual.status).toEqual(TimeRecordStatus.LEFT_WORK);
  });

  test.concurrent("勤務終了(出勤打刻なし)", () => {
    const actual = timeRecordReducer(
      {
        workStart: null,
        workEnd: null,
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [],
      },
      {
        type: "timeRecord/clockOut",
        payload: undefined,
      }
    );
    expect(actual.workEnd).toBeNull();
    expect(actual.status).toEqual(TimeRecordStatus.ERROR);
  });

  test.concurrent("勤務終了(二重打刻)", () => {
    const actual = timeRecordReducer(
      {
        workStart: new Date(),
        workEnd: new Date(),
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [],
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
        workStart: new Date(),
        workEnd: null,
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [
          {
            start: new Date(),
            end: null,
          },
        ],
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
        workStart: null,
        workEnd: null,
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [],
      },
      {
        type: "timeRecord/goDirect",
        payload: undefined,
      }
    );
    expect(actual.workStart).not.toBeNull();
    expect(actual.goDirect).toBeTruthy();
    expect(actual.status).toEqual(TimeRecordStatus.WORKING);
  });

  test.concurrent("直行(出勤打刻済み)", () => {
    const actual = timeRecordReducer(
      {
        workStart: new Date(),
        workEnd: null,
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [],
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
        workStart: new Date(),
        workEnd: null,
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [],
      },
      {
        type: "timeRecord/returnDirect",
        payload: undefined,
      }
    );
    expect(actual.workEnd).not.toBeNull();
    expect(actual.returnDirect).toBeTruthy();
    expect(actual.status).toEqual(TimeRecordStatus.LEFT_WORK);
  });

  test.concurrent("直帰(出勤なし)", () => {
    const actual = timeRecordReducer(
      {
        workStart: null,
        workEnd: null,
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [],
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
        workStart: new Date(),
        workEnd: new Date(),
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [],
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
        workStart: new Date(),
        workEnd: null,
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [],
      },
      {
        type: "timeRecord/startRest",
        payload: undefined,
      }
    );
    expect(actual.rests[actual.rests.length - 1].start).not.toBeNull();
    expect(actual.status).toEqual(TimeRecordStatus.RESTING);
  });

  test.concurrent("休憩開始(退勤済み)", () => {
    const actual = timeRecordReducer(
      {
        workStart: new Date(),
        workEnd: new Date(),
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [],
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
        workStart: new Date(),
        workEnd: null,
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [
          {
            start: new Date(),
            end: null,
          },
        ],
      },
      {
        type: "timeRecord/endRest",
        payload: undefined,
      }
    );
    expect(actual.rests.length).toEqual(1);
    expect(actual.rests[actual.rests.length - 1].end).not.toBeNull();
    expect(actual.status).toEqual(TimeRecordStatus.WORKING);
  });

  test.concurrent("休憩終了(休憩なし)", () => {
    const actual = timeRecordReducer(
      {
        workStart: new Date(),
        workEnd: null,
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [],
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
        workStart: new Date(),
        workEnd: null,
        goDirect: false,
        returnDirect: false,
        status: TimeRecordStatus.BEFORE_WORK,
        rests: [
          {
            start: null,
            end: null,
          },
        ],
      },
      {
        type: "timeRecord/endRest",
        payload: undefined,
      }
    );
    expect(actual.status).toEqual(TimeRecordStatus.ERROR);
  });
});
