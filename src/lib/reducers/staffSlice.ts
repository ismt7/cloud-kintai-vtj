import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { Staff } from "../../api";
import fetchStaff from "../staff/FetchStaff";

export enum StaffStatus {
  NOT_PROCESSING = "NOT_PROCESSING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export interface StaffState {
  status: StaffStatus;
  data: Staff | null;
}

const initialState: StaffState = {
  status: StaffStatus.NOT_PROCESSING,
  data: null,
};

export const getStaffExtraReducers = (
  builder: ActionReducerMapBuilder<StaffState>
) => {
  builder
    .addCase(fetchStaff.pending, (state) => {
      state.status = StaffStatus.PROCESSING;
    })
    .addCase(fetchStaff.fulfilled, (state, action) => {
      state.status = StaffStatus.DONE;
      state.data = action.payload as Staff;
    })
    .addCase(fetchStaff.rejected, (state) => {
      state.status = StaffStatus.ERROR;
    });
};

const staffRecordSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    clearStaff(state) {
      state.status = StaffStatus.NOT_PROCESSING;
      state.data = null;
    },
  },
  extraReducers: (builder) => getStaffExtraReducers(builder),
});

export default staffRecordSlice.reducer;

export const { clearStaff } = staffRecordSlice.actions;

export const testStaffRecordSlice = (customInitialState: StaffState) =>
  createSlice({
    name: "staff",
    initialState: customInitialState,
    reducers: {
      clearStaff(state) {
        state.status = StaffStatus.NOT_PROCESSING;
        state.data = null;
      },
    },
    extraReducers: (builder) => getStaffExtraReducers(builder),
  }).reducer;
