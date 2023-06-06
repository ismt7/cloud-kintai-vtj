import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-cycle
import { RootState } from "../../app/store";
import fetchJobTermList, { JobTermList } from "../job_term/FetchJobTermList";

export enum JobTermListStatus {
  NOT_PROCESSING = "NOT PROCESSING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export interface JobTermListState {
  status: JobTermListStatus;
  data: JobTermList[];
}

const initialState: JobTermListState = {
  status: JobTermListStatus.NOT_PROCESSING,
  data: [],
};

const getJobTermListExtraReducers = (
  builder: ActionReducerMapBuilder<JobTermListState>
) => {
  builder
    .addCase(fetchJobTermList.pending, (state) => {
      state.status = JobTermListStatus.PROCESSING;
    })
    .addCase(fetchJobTermList.fulfilled, (state, action) => {
      state.status = JobTermListStatus.DONE;
      state.data = action.payload;
    })
    .addCase(fetchJobTermList.rejected, (state) => {
      state.status = JobTermListStatus.ERROR;
      state.data = [];
    });
};

const jobTermReducer = createSlice({
  name: "jobTermReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => getJobTermListExtraReducers(builder),
});
export default jobTermReducer.reducer;

export const testJobTermSlice = (customInitialState: JobTermListState) =>
  createSlice({
    name: "jobTermReducer",
    initialState: customInitialState,
    reducers: {},
    extraReducers: (builder) => getJobTermListExtraReducers(builder),
  }).reducer;

export const selectJobTermList = (state: RootState) => state.jobTermReducer;
