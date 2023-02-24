import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { Staff } from "../../api";
import createStaff from "../staff/CreateStaff";
import deleteStaff from "../staff/DeleteStaff";
import updateStaff from "../staff/UpdateStaff";

export enum CreateStaffStatus {
  NOT_PROCESSING = "NOT_PROCESSING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export interface CreateStaffState {
  status: CreateStaffStatus;
  data: Staff | null;
}

const initialState: CreateStaffState = {
  status: CreateStaffStatus.NOT_PROCESSING,
  data: null,
};

export const getCreateStaffExtraReducers = (
  builder: ActionReducerMapBuilder<CreateStaffState>
) => {
  builder
    .addCase(createStaff.pending, (state) => {
      state.status = CreateStaffStatus.PROCESSING;
    })
    .addCase(createStaff.fulfilled, (state, action) => {
      state.status = CreateStaffStatus.DONE;
      state.data = action.payload as Staff;
    })
    .addCase(createStaff.rejected, (state) => {
      state.status = CreateStaffStatus.ERROR;
    });

  builder
    .addCase(updateStaff.pending, (state) => {
      state.status = CreateStaffStatus.PROCESSING;
    })
    .addCase(updateStaff.fulfilled, (state, action) => {
      state.status = CreateStaffStatus.DONE;
      state.data = action.payload as Staff;
    })
    .addCase(updateStaff.rejected, (state) => {
      state.status = CreateStaffStatus.ERROR;
    });

  builder
    .addCase(deleteStaff.pending, (state) => {
      state.status = CreateStaffStatus.PROCESSING;
    })
    .addCase(deleteStaff.fulfilled, (state, action) => {
      state.status = action.payload
        ? CreateStaffStatus.DONE
        : CreateStaffStatus.ERROR;
      state.data = null;
    })
    .addCase(deleteStaff.rejected, (state) => {
      state.status = CreateStaffStatus.ERROR;
    });
};

const staffReducer = createSlice({
  name: "createStaff",
  initialState,
  reducers: {},
  extraReducers: (builder) => getCreateStaffExtraReducers(builder),
});

export default staffReducer.reducer;

export const testStaffReducer = (customInitialState: CreateStaffState) =>
  createSlice({
    name: "createStaff",
    initialState: customInitialState,
    reducers: {},
    extraReducers: (builder) => getCreateStaffExtraReducers(builder),
  }).reducer;
