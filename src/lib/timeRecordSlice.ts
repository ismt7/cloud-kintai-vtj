import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { RootState } from "./store";
import { TimeRecordStatus, TimeRecordStatusList } from "./time_record/enum";
import fetchRest from "./time_record/FetchRest";
import fetchAttendance from "./time_record/FetchAttendance";
import { AttendanceApi, Configuration } from "../api";

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
  attendanceData: undefined,
  restData: undefined,
  status: TimeRecordStatus.BEFORE_WORK,
  error: undefined,
};

export const registerClockIn = createAsyncThunk(
  "timeRecord/registerClockIn",
  async ({
    staffId,
    workDate,
    start_time,
    go_directly_flag,
  }: {
    staffId: number;
    workDate: number;
    start_time: string;
    go_directly_flag: boolean;
  }) => {
    const conf = new Configuration({
      basePath: process.env.BASE_PATH,
    });

    const attendanceApi = new AttendanceApi(conf);
    const attendance = await attendanceApi
      .registerClockInAttendancesStaffIdWorkDateClockInPost({
        staffId,
        workDate,
        attendanceClockIn: {
          startTime: start_time,
          goDirectlyFlag: go_directly_flag,
        },
      })
      .then((r) => r)
      .catch(() => undefined);

    return attendance;
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
      .addCase(fetchAttendance.pending, () => {})
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          state.attendanceData = undefined;
          return;
        }

        state.attendanceData = JSON.parse(
          JSON.stringify(action.payload)
        ) as Attendance;
      })
      .addCase(fetchAttendance.rejected, (state) => {
        state.attendanceData = undefined;
        state.status = TimeRecordStatus.ERROR;
        state.error = "エラーが発生しました";
      });

    builder
      .addCase(fetchRest.pending, () => {})
      .addCase(fetchRest.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          state.restData = undefined;
          return;
        }
        state.restData = JSON.parse(JSON.stringify(action.payload)) as Rest;
      })
      .addCase(fetchRest.rejected, (state) => {
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
