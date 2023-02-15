import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import fetchTimeRecordList, {
  TimeRecordList,
} from "../time_record_list/FetchTimeRecordList";

export enum TimeRecordListStatus {
  NOT_PROCESSING = "NOT PROCESSING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export interface TimeRecordListState {
  status: TimeRecordListStatus;
  data: TimeRecordList[];
}

const initialState: TimeRecordListState = {
  status: TimeRecordListStatus.NOT_PROCESSING,
  data: [],
};

const getTimeRecordListExtraReducers = (
  builder: ActionReducerMapBuilder<TimeRecordListState>
) => {
  builder
    .addCase(fetchTimeRecordList.pending, (state) => {
      state.status = TimeRecordListStatus.PROCESSING;
    })
    .addCase(fetchTimeRecordList.fulfilled, (state, action) => {
      state.status = TimeRecordListStatus.DONE;
      state.data = action.payload;
    })
    .addCase(fetchTimeRecordList.rejected, (state) => {
      state.status = TimeRecordListStatus.ERROR;
      state.data = [];
    });
};

const timeRecordListReducer = createSlice({
  name: "timeRecordList",
  initialState,
  reducers: {},
  extraReducers: (builder) => getTimeRecordListExtraReducers(builder),
});

export default timeRecordListReducer.reducer;

export const testTimeRecordListSlice = (
  customInitialState: TimeRecordListState
) =>
  createSlice({
    name: "timeRecordList",
    initialState: customInitialState,
    reducers: {},
    extraReducers: (builder) => getTimeRecordListExtraReducers(builder),
  }).reducer;
