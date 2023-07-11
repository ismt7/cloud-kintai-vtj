import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import dayjs from "dayjs";
import { MasterApi } from "../../../api";
// eslint-disable-next-line import/no-cycle
import { RootState } from "../../../app/store";
import { GetConfiguration } from "../../time_recorder/TimeRecorderAPI";
import fetchJobTermList, { JobTermList } from "./FetchJobTermList";

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

export const updateJobTerm = createAsyncThunk(
  "jobTermList/updateJobTerm",
  async ({
    targetMonth,
    jobStartDate,
    jobEndDate,
  }: {
    targetMonth: string;
    jobStartDate: dayjs.Dayjs;
    jobEndDate: dayjs.Dayjs;
  }): Promise<void> => {
    const api = new MasterApi(GetConfiguration());
    await api
      .createWorkPeriodPerMonth({
        workPeriodPerMonthCreate: {
          targetMonth,
          jobStartDate: jobStartDate.toDate(),
          jobEndDate: jobEndDate.toDate(),
        },
      })
      .catch((e) => {
        console.log(e);

        throw e;
      });
  }
);

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

  builder
    .addCase(updateJobTerm.pending, (state) => {
      state.status = JobTermListStatus.PROCESSING;
    })
    .addCase(updateJobTerm.fulfilled, (state) => {
      state.status = JobTermListStatus.DONE;
    })
    .addCase(updateJobTerm.rejected, (state) => {
      state.status = JobTermListStatus.ERROR;
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
