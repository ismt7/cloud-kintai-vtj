import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import getTimeRecordStatus from "../time_record/getTimeRecordStatus";

export enum TimeRecordStatus {
  PROCESSING = "PROCESSING",
  BEFORE_WORK = "BEFORE_WORK",
  WORKING = "WORKING",
  RESTING = "RESTING",
  LEFT_WORK = "LEFT_WORK",
  ERROR = "ERROR",
}

export const TimeRecordStatusText = {
  PROCESSING: "処理中",
  BEFORE_WORK: "出勤前",
  WORKING: "勤務中",
  RESTING: "休憩中",
  LEFT_WORK: "退勤済み",
  ERROR: "エラー",
};

export interface TimeRecordState {
  status: TimeRecordStatus;
  statusText: string;
}

const initialState: TimeRecordState = {
  status: TimeRecordStatus.BEFORE_WORK,
  statusText: TimeRecordStatusText.BEFORE_WORK,
};

export const getExtraReducers = (
  builder: ActionReducerMapBuilder<TimeRecordState>
) => {
  builder
    .addCase(getTimeRecordStatus.pending, (state) => {
      state.status = TimeRecordStatus.PROCESSING;
      state.statusText = TimeRecordStatusText.PROCESSING;
    })
    .addCase(getTimeRecordStatus.fulfilled, (state, action) => {
      state.status = action.payload;
      state.statusText = TimeRecordStatusText[action.payload];
    })
    .addCase(getTimeRecordStatus.rejected, (state) => {
      state.status = TimeRecordStatus.ERROR;
      state.statusText = TimeRecordStatusText.ERROR;
    });
};

const TimeRecordSlice = createSlice({
  name: "timeRecord",
  initialState,
  reducers: {},
  extraReducers: (builder) => getExtraReducers(builder),
});

export default TimeRecordSlice.reducer;

export const testTimeRecordSlice = (customInitialState: TimeRecordState) =>
  createSlice({
    name: "TimeRecord",
    initialState: customInitialState,
    reducers: {},
    extraReducers: (builder) => getExtraReducers(builder),
  }).reducer;
