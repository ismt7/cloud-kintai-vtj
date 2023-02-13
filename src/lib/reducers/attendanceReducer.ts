import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import fetchAttendance, {
  OriginAttendance,
} from "../time_record/FetchAttendance";
import registerClockIn from "../time_record/RegisterClockIn";
import registerClockOut from "../time_record/RegisterClockOut";
import updateRemarks from "../time_record/UpdateRemarks";

export enum AttendanceStatus {
  NOT_PROCESSING = "NOT PROCESSING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export interface AttendanceState {
  status: AttendanceStatus;
  data: OriginAttendance | null;
}

const initialState: AttendanceState = {
  status: AttendanceStatus.NOT_PROCESSING,
  data: null,
};

export const getAttendanceExtraReducers = (
  builder: ActionReducerMapBuilder<AttendanceState>
) => {
  // 取得
  builder
    .addCase(fetchAttendance.pending, (state) => {
      state.status = AttendanceStatus.PROCESSING;
    })
    .addCase(fetchAttendance.fulfilled, (state, action) => {
      state.status = AttendanceStatus.DONE;
      state.data = action.payload;
    })
    .addCase(fetchAttendance.rejected, (state) => {
      state.status = AttendanceStatus.ERROR;
      state.data = null;
    });

  // 出勤
  builder
    .addCase(registerClockIn.pending, () => {})
    .addCase(registerClockIn.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addCase(registerClockIn.rejected, (state) => {
      state.data = null;
    });

  // 退勤
  builder
    .addCase(registerClockOut.pending, () => {})
    .addCase(registerClockOut.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addCase(registerClockOut.rejected, (state) => {
      state.data = null;
    });

  // 備考欄更新
  builder
    .addCase(updateRemarks.pending, () => {})
    .addCase(updateRemarks.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addCase(updateRemarks.rejected, (state) => {
      state.data = null;
    });
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => getAttendanceExtraReducers(builder),
});

export default attendanceSlice.reducer;

export const testAttendanceSlice = (customInitialState: AttendanceState) =>
  createSlice({
    name: "attendance",
    initialState: customInitialState,
    reducers: {},
    extraReducers: (builder) => getAttendanceExtraReducers(builder),
  }).reducer;
