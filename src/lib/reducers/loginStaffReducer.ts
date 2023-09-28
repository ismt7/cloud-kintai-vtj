import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-cycle
import { RootState } from "../../app/store";
import { Staff } from "../../client";
import fetchLoginStaff from "../staff/FetchLoginStaff";

export enum LoginStaffStatus {
  NOT_PROCESSING = "NOT_PROCESSING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export interface LoginStaffState {
  status: LoginStaffStatus;
  data?: Staff;
}

const initialState: LoginStaffState = {
  status: LoginStaffStatus.NOT_PROCESSING,
  data: undefined,
};

export const getLoginStaffExtraReducers = (
  builder: ActionReducerMapBuilder<LoginStaffState>
) => {
  builder
    .addCase(fetchLoginStaff.pending, (state) => {
      state.status = LoginStaffStatus.PROCESSING;
    })
    .addCase(fetchLoginStaff.fulfilled, (state, action) => {
      state.status = LoginStaffStatus.DONE;
      state.data = action.payload as Staff;
    })
    .addCase(fetchLoginStaff.rejected, (state) => {
      state.status = LoginStaffStatus.ERROR;
    });
};

const loginStaffReducer = createSlice({
  name: "loginStaff",
  initialState,
  reducers: {
    clearLoginStaff(state) {
      state.status = LoginStaffStatus.NOT_PROCESSING;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => getLoginStaffExtraReducers(builder),
});

export default loginStaffReducer.reducer;

export const { clearLoginStaff } = loginStaffReducer.actions;

export const testLoginStaffReducer = (customInitialState: LoginStaffState) =>
  createSlice({
    name: "loginStaff",
    initialState: customInitialState,
    reducers: {
      clearLoginStaff(state) {
        state.status = LoginStaffStatus.NOT_PROCESSING;
        state.data = undefined;
      },
    },
    extraReducers: (builder) => getLoginStaffExtraReducers(builder),
  }).reducer;

export const selectLoginStaff = (state: RootState) => state.loginStaffReducer;
