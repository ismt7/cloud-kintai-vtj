import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-cycle
import { RootState } from "../../app/store";
import fetchRest, { OriginRest } from "../time_record/FetchRest";
import registerRestEnd from "../time_record/RegisterRestEnd";
import registerRestStart from "../time_record/RegisterRestStart";

export enum RestStatus {
  NOT_PROCESSING = "NOT PROCESSING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export interface RestState {
  status: RestStatus;
  data: OriginRest | null;
}

const initialState: RestState = {
  status: RestStatus.NOT_PROCESSING,
  data: null,
};

export const getRestExtraReducers = (
  builder: ActionReducerMapBuilder<RestState>
) => {
  // 取得
  builder
    .addCase(fetchRest.pending, (state) => {
      state.status = RestStatus.PROCESSING;
    })
    .addCase(fetchRest.fulfilled, (state, action) => {
      state.status = RestStatus.DONE;
      state.data = action.payload;
    })
    .addCase(fetchRest.rejected, (state) => {
      state.status = RestStatus.ERROR;
      state.data = null;
    });

  // 休憩開始
  builder
    .addCase(registerRestStart.pending, (state) => {
      state.status = RestStatus.PROCESSING;
    })
    .addCase(registerRestStart.fulfilled, (state, action) => {
      state.status = RestStatus.DONE;
      state.data = action.payload;
    })
    .addCase(registerRestStart.rejected, (state) => {
      state.status = RestStatus.ERROR;
      state.data = null;
    });

  // 休憩終了
  builder
    .addCase(registerRestEnd.pending, (state) => {
      state.status = RestStatus.PROCESSING;
    })
    .addCase(registerRestEnd.fulfilled, (state, action) => {
      state.status = RestStatus.DONE;
      state.data = action.payload;
    })
    .addCase(registerRestEnd.rejected, (state) => {
      state.status = RestStatus.ERROR;
      state.data = null;
    });
};

const restSlice = createSlice({
  name: "rest",
  initialState,
  reducers: {},
  extraReducers: (builder) => getRestExtraReducers(builder),
});

export default restSlice.reducer;

export const testRestSlice = (customInitialState: RestState) =>
  createSlice({
    name: "rest",
    initialState: customInitialState,
    reducers: {},
    extraReducers: (builder) => getRestExtraReducers(builder),
  }).reducer;

export const selectRest = (state: RootState) => state.restReducer;
