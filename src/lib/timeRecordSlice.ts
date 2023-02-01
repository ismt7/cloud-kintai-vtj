import { createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { RootState } from "./store";

export enum TimeRecordStatus {
  BEFORE_WORK = "BEFORE_WORK",
  WORKING = "WORKING",
  RESTING = "RESTING",
  LEFT_WORK = "LEFT_WORK",
  ERROR = "ERROR",
}

export interface RestState {
  start: Date | null;
  end: Date | null;
}

export interface TimeRecordState {
  workStart: Date | null;
  workEnd: Date | null;
  goDirect: boolean;
  returnDirect: boolean;
  rests: RestState[];
  status: TimeRecordStatus;
}

const initialState: TimeRecordState = {
  workStart: null,
  workEnd: null,
  goDirect: false,
  returnDirect: false,
  status: TimeRecordStatus.BEFORE_WORK,
  rests: [],
};

const TimeRecordStatusList = {
  BEFORE_WORK: "出勤前",
  WORKING: "勤務中",
  RESTING: "休憩中",
  LEFT_WORK: "退勤済み",
  ERROR: "エラー",
};

const timeRecordSlice = createSlice({
  name: "timeRecord",
  initialState,
  reducers: {
    clockIn: (state) => {
      // 出勤済みの場合はエラー
      if (state.workStart !== null) {
        state.status = TimeRecordStatus.ERROR;
        return;
      }
      state.workStart = new Date();
      state.status = TimeRecordStatus.WORKING;
    },
    clockOut: (state) => {
      // 出勤打刻なしの場合はエラー
      // 退勤済みの場合はエラー
      if (state.workStart === null || state.workEnd !== null) {
        state.status = TimeRecordStatus.ERROR;
        return;
      }

      // 休憩中の場合はエラー
      if (state.rests.length > 0) {
        const lastRest = state.rests[state.rests.length - 1];
        if (lastRest.end === null) {
          state.status = TimeRecordStatus.ERROR;
          return;
        }
      }

      state.workEnd = new Date();
      state.status = TimeRecordStatus.LEFT_WORK;
    },
    startRest: (state) => {
      // 出勤打刻なしの場合はエラー
      // 退勤済みの場合はエラー
      if (state.workStart === null || state.workEnd !== null) {
        state.status = TimeRecordStatus.ERROR;
        return;
      }
      state.rests.push({ start: new Date(), end: null });
      state.status = TimeRecordStatus.RESTING;
    },
    endRest: (state) => {
      const rest = state.rests.pop();
      if (rest === undefined || rest.start === null) {
        state.status = TimeRecordStatus.ERROR;
        return;
      }
      rest.end = new Date();
      state.rests.push(rest);
      state.status = TimeRecordStatus.WORKING;
    },
    goDirect: (state) => {
      // 出勤済みの場合はエラー
      if (state.workStart !== null) {
        state.status = TimeRecordStatus.ERROR;
        return;
      }

      state.workStart = new Date();
      state.goDirect = true;
      state.status = TimeRecordStatus.WORKING;
    },
    returnDirect: (state) => {
      // 出勤打刻なしの場合はエラー
      // 退勤済みの場合はエラー
      if (state.workStart === null || state.workEnd !== null) {
        state.status = TimeRecordStatus.ERROR;
        return;
      }

      state.returnDirect = true;
      state.workEnd = new Date();
      state.status = TimeRecordStatus.LEFT_WORK;
    },
  },
});

// eslint-disable-next-line operator-linebreak
export const { clockIn, clockOut, startRest, endRest, goDirect, returnDirect } =
  timeRecordSlice.actions;

export const selectTimeRecordStatus = (state: RootState) => ({
  code: state.timeRecordReducer.status,
  text: TimeRecordStatusList[state.timeRecordReducer.status],
});

export default timeRecordSlice.reducer;
