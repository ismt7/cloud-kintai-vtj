import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  AttendanceApi,
  Configuration,
  RestApi,
  Staff,
  StaffApi,
} from "../../api";
// eslint-disable-next-line import/no-cycle
import { RootState } from "../../app/store";
import { OriginAttendance } from "../../lib/time_record/FetchAttendance";
import { OriginRest } from "../../lib/time_record/FetchRest";
import {
  GetConfiguration,
  mappedOriginAttendance,
  mappedOriginRest,
} from "../time_recorder/TimeRecorderAPI";

export enum AttendanceEditorStatus {
  NOT_PROCESSING = "NOT PROCESSING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export interface AttendanceEditorState {
  status: AttendanceEditorStatus;
  staff: Staff | undefined;
  attendance: OriginAttendance | undefined;
  rests: OriginRest[] | undefined;
}

const initialState: AttendanceEditorState = {
  status: AttendanceEditorStatus.NOT_PROCESSING,
  staff: undefined,
  attendance: undefined,
  rests: undefined,
};

export const fetchStaff = createAsyncThunk(
  "attendanceEditor/fetchStaff",
  async ({ staffId }: { staffId: number }) => {
    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });

    const staffApi = new StaffApi(conf);
    const staff = await staffApi
      .getStaffById({ staffId })
      .then((r) => r)
      .catch(() => undefined);

    return staff;
  }
);

export const fetchAttendance = createAsyncThunk(
  "attendanceEditor/fetchAttendance",
  async ({ staffId, workDate }: { staffId: number; workDate: number }) => {
    const api = new AttendanceApi(GetConfiguration());
    const attendance = await api
      .getAttendance({
        staffId,
        workDate,
      })
      .then((r) => mappedOriginAttendance(r))
      .catch(() => undefined);

    if (attendance?.staffId === undefined || attendance === undefined) {
      return undefined;
    }

    return attendance;
  }
);

export const fetchRests = createAsyncThunk(
  "attendanceEditor/fetchRests",
  async ({ staffId, workDate }: { staffId: number; workDate: number }) => {
    const api = new RestApi(GetConfiguration());
    const rests = await api
      .getRests({
        staffId,
        fromWorkDate: workDate,
        toWorkDate: workDate,
      })
      .then((responses) => responses.map((res) => mappedOriginRest(res)))
      .catch(() => undefined);

    return rests;
  }
);

const getExtraReducers = (
  builder: ActionReducerMapBuilder<AttendanceEditorState>
) => {
  builder
    .addCase(fetchStaff.pending, (state) => {
      state.status = AttendanceEditorStatus.PROCESSING;
    })
    .addCase(fetchStaff.fulfilled, (state, action) => {
      state.status = AttendanceEditorStatus.DONE;
      state.staff = action.payload;
    })
    .addCase(fetchStaff.rejected, (state) => {
      state.status = AttendanceEditorStatus.ERROR;
      state.staff = undefined;
    });

  builder
    .addCase(fetchAttendance.pending, (state) => {
      state.status = AttendanceEditorStatus.PROCESSING;
    })
    .addCase(fetchAttendance.fulfilled, (state, action) => {
      state.status = AttendanceEditorStatus.DONE;
      state.attendance = action.payload;
    })
    .addCase(fetchAttendance.rejected, (state) => {
      state.status = AttendanceEditorStatus.ERROR;
      state.attendance = undefined;
    });

  builder
    .addCase(fetchRests.pending, (state) => {
      state.status = AttendanceEditorStatus.PROCESSING;
    })
    .addCase(fetchRests.fulfilled, (state, action) => {
      state.status = AttendanceEditorStatus.DONE;
      state.rests = action.payload;
    })
    .addCase(fetchRests.rejected, (state) => {
      state.status = AttendanceEditorStatus.ERROR;
      state.rests = [];
    });
};

const attendanceEditorSlice = createSlice({
  name: "attendanceEditor",
  initialState,
  reducers: {},
  extraReducers: (builder) => getExtraReducers(builder),
});

export default attendanceEditorSlice.reducer;

export const testAttendanceEditorSlice = (
  customInitialState: AttendanceEditorState
) =>
  createSlice({
    name: "attendanceEditor",
    initialState: customInitialState,
    reducers: {},
    extraReducers: (builder) => getExtraReducers(builder),
  }).reducer;

export const selectAttendanceEditor = (state: RootState) =>
  state.attendanceEditorReducer;
