import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { RootState } from "./store";

export enum TimeRecordStatus {
  BEFORE_WORK = "BEFORE_WORK",
  WORKING = "WORKING",
  RESTING = "RESTING",
  LEFT_WORK = "LEFT_WORK",
  ERROR = "ERROR",
  PROCESSING = "PROCESSING",
}

export interface RestState {
  start?: Date;
  end?: Date;
}

export interface Attendance {
  attendance_id?: number;
  staff_id?: number;
  work_date?: Date;
  start_time?: Date;
  end_time?: Date;
  go_directly_flag?: boolean;
  return_directly_flag?: boolean;
  remarks?: string;
}

export interface Rest {
  rest_time_id?: number;
  staff_id?: number;
  work_date?: Date;
  start_time?: Date;
  end_time?: Date;
}

export interface TimeRecordState {
  attendanceData: Attendance | undefined;
  restData: Rest | undefined;
  status: TimeRecordStatus;
  error?: string;
}

const initialState: TimeRecordState = {
  attendanceData: {},
  restData: {},
  status: TimeRecordStatus.BEFORE_WORK,
  error: undefined,
};

export const TimeRecordStatusList = {
  BEFORE_WORK: "出勤前",
  WORKING: "勤務中",
  RESTING: "休憩中",
  LEFT_WORK: "退勤済み",
  ERROR: "エラー",
  PROCESSING: "処理中",
};

export const fetchTimeRecord = createAsyncThunk(
  "timeRecord/fetchTimeRecord",
  async () => {
    const response = await fetch(
      "http://localhost:8000/attendances/999/20230101"
    );

    if (response.status === 404) {
      return undefined;
    }

    return response.json();
  }
);

export const fetchRestTime = createAsyncThunk(
  "timeRecord/fetchRestTime",
  async () => {
    const response = await fetch("http://localhost:8000/rests/999/20230101");

    if (response.status === 404) {
      return undefined;
    }

    return response.json();
  }
);

const timeRecordSlice = createSlice({
  name: "timeRecord",
  initialState,
  reducers: {
    clockIn: (state) => {
      if (
        !state.attendanceData ||
        (state.attendanceData.start_time && state.attendanceData.end_time)
      ) {
        state.attendanceData = {
          start_time: new Date(),
        };
        state.status = TimeRecordStatus.WORKING;
        return;
      }

      state.status = TimeRecordStatus.ERROR;
    },
    clockOut: (state) => {
      if (
        state.attendanceData &&
        state.attendanceData.start_time &&
        !state.attendanceData.end_time
      ) {
        if (
          !state.restData ||
          (state.restData.start_time && state.restData.end_time)
        ) {
          state.attendanceData.end_time = new Date();
          state.status = TimeRecordStatus.LEFT_WORK;
          return;
        }
      }

      state.status = TimeRecordStatus.ERROR;
    },
    startRest: (state) => {
      if (
        state.attendanceData &&
        state.attendanceData.start_time &&
        !state.attendanceData.end_time
      ) {
        if (
          !state.restData ||
          (state.restData.start_time && state.restData.end_time)
        ) {
          state.restData = {
            start_time: new Date(),
          };
          state.status = TimeRecordStatus.RESTING;
          return;
        }
      }

      state.status = TimeRecordStatus.ERROR;
    },
    endRest: (state) => {
      if (
        state.attendanceData &&
        state.attendanceData.start_time &&
        !state.attendanceData.end_time
      ) {
        if (
          state.restData &&
          state.restData.start_time &&
          !state.restData.end_time
        ) {
          state.restData.end_time = new Date();
          state.status = TimeRecordStatus.WORKING;
          return;
        }
      }

      state.status = TimeRecordStatus.ERROR;
    },
    goDirect: (state) => {
      if (
        !state.attendanceData ||
        (!state.attendanceData.start_time && !state.attendanceData.end_time)
      ) {
        state.attendanceData = {
          start_time: new Date(),
          go_directly_flag: true,
        };
        state.status = TimeRecordStatus.WORKING;
        return;
      }

      state.status = TimeRecordStatus.ERROR;
    },
    returnDirect: (state) => {
      if (
        state.attendanceData &&
        state.attendanceData.start_time &&
        !state.attendanceData.end_time
      ) {
        if (
          !state.restData ||
          (state.restData.start_time && state.restData.end_time)
        ) {
          state.attendanceData.end_time = new Date();
          state.attendanceData.return_directly_flag = true;
          state.status = TimeRecordStatus.LEFT_WORK;
          return;
        }
      }

      state.status = TimeRecordStatus.ERROR;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeRecord.pending, () => {})
      .addCase(fetchTimeRecord.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          state.attendanceData = undefined;
          return;
        }

        state.attendanceData = JSON.parse(
          JSON.stringify(action.payload)
        ) as Attendance;
      })
      .addCase(fetchTimeRecord.rejected, (state) => {
        state.attendanceData = undefined;
        state.status = TimeRecordStatus.ERROR;
        state.error = "エラーが発生しました";
      })

      .addCase(fetchRestTime.pending, () => {})
      .addCase(fetchRestTime.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          state.restData = undefined;
          return;
        }

        state.restData = JSON.parse(JSON.stringify(action.payload)) as Rest;
      })
      .addCase(fetchRestTime.rejected, (state) => {
        state.restData = undefined;
        state.status = TimeRecordStatus.ERROR;
        state.error = "エラーが発生しました";
      });
  },
});

export const { clockIn, clockOut, startRest, endRest, goDirect, returnDirect } =
  timeRecordSlice.actions;

export const selectTimeRecord = (state: RootState) => ({
  attendanceData: state.timeRecordReducer.attendanceData,
  restData: state.timeRecordReducer.restData,
  status: {
    code: TimeRecordStatus.PROCESSING,
    text: TimeRecordStatusList[TimeRecordStatus.PROCESSING],
  },
});

export default timeRecordSlice.reducer;
