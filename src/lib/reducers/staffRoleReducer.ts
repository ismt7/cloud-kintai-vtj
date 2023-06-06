import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import { StaffRole } from "../../api";
// eslint-disable-next-line import/no-cycle
import { RootState } from "../../app/store";
import updateStaffRole from "../staff_role/updateStaffRole";

export enum StaffRoleStatus {
  NOT_PROCESSING = "NOT_PROCESSING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export interface StaffRoleState {
  status: StaffRoleStatus;
  data?: StaffRole;
}

const initialState: StaffRoleState = {
  status: StaffRoleStatus.NOT_PROCESSING,
  data: undefined,
};

export const getStaffRoleExtraReducers = (
  builder: ActionReducerMapBuilder<StaffRoleState>
) => {
  builder
    .addCase(updateStaffRole.pending, (state) => {
      state.status = StaffRoleStatus.PROCESSING;
    })
    .addCase(updateStaffRole.fulfilled, (state, action) => {
      state.status = StaffRoleStatus.DONE;
      state.data = action.payload as StaffRole;
    })
    .addCase(updateStaffRole.rejected, (state) => {
      state.status = StaffRoleStatus.ERROR;
    });
};

const staffRoleReducer = createSlice({
  name: "staffRole",
  initialState,
  reducers: {},
  extraReducers: (builder) => getStaffRoleExtraReducers(builder),
});

export default staffRoleReducer.reducer;

export const testStaffRoleReducer = (customInitialState: StaffRoleState) =>
  createSlice({
    name: "staffRole",
    initialState: customInitialState,
    reducers: {},
    extraReducers: (builder) => getStaffRoleExtraReducers(builder),
  });

export const selectStaffRole = (state: RootState) => state.staffRoleReducer;
