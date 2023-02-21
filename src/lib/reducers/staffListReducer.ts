import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { Staff } from "../../api";
import fetchStaffList from "../staff/FetchStaffList";

export enum StaffListStatus {
  NOT_PROCESSING = "NOT_PROCESSING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export interface StaffListState {
  status: StaffListStatus;
  data: Staff[];
  selectedData?: Staff;
}

const initialState: StaffListState = {
  status: StaffListStatus.NOT_PROCESSING,
  data: [],
  selectedData: undefined,
};

export const getStaffListExtraReducers = (
  builder: ActionReducerMapBuilder<StaffListState>
) => {
  builder
    .addCase(fetchStaffList.pending, (state) => {
      state.status = StaffListStatus.PROCESSING;
    })
    .addCase(fetchStaffList.fulfilled, (state, action) => {
      state.status = StaffListStatus.DONE;
      state.data = action.payload as Staff[];
    })
    .addCase(fetchStaffList.rejected, (state) => {
      state.status = StaffListStatus.ERROR;
    });
};

const staffListReducer = createSlice({
  name: "staffList",
  initialState,
  reducers: {
    selectedStaff: (state, action) => {
      state.selectedData = action.payload as Staff;
    },
  },
  extraReducers: (builder) => getStaffListExtraReducers(builder),
});

export default staffListReducer.reducer;

export const { selectedStaff } = staffListReducer.actions;

export const testStaffListReducer = (customInitialState: StaffListState) =>
  createSlice({
    name: "staffList",
    initialState: customInitialState,
    reducers: {},
    extraReducers: (builder) => getStaffListExtraReducers(builder),
  }).reducer;
