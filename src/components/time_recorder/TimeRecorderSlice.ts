import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import dayjs from "dayjs";

// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from "../../app/store";
import { OriginAttendance } from "../../lib/time_record/FetchAttendance";
import { OriginRest } from "../../lib/time_record/FetchRest";

import {
  attendanceRegisterClockIn,
  attendanceRegisterClockOut,
  attendanceRegisterRemarks,
  fetchAttendance,
  fetchRest,
  restRegisterEnd,
  restRegisterStart,
} from "./TimeRecorderAPI";
import {
  getCurrentWorkStatus,
  WorkStatus,
  WorkStatusCodes,
  WorkStatusTexts,
} from "./WorkStatusCodes";

export enum TimeRecorderStatus {
  NOT_PROCESSING = "NOT PROCESSING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export interface TimeRecorderData {
  attendance: OriginAttendance | null;
  rest: OriginRest | null;
}

export interface TimeRecorderState {
  status: TimeRecorderStatus;
  workStatus: WorkStatus;
  data: TimeRecorderData;
}

const initialState: TimeRecorderState = {
  status: TimeRecorderStatus.NOT_PROCESSING,
  workStatus: {
    code: WorkStatusCodes.PROCESSING,
    text: WorkStatusTexts.PROCESSING,
  },
  data: {
    attendance: null,
    rest: null,
  },
};

export const fetchCurrentData = createAsyncThunk(
  "timeRecorder/fetchCurrentData",
  async ({ staffId, workDate }: { staffId: number; workDate: number }) => {
    const attendance = await fetchAttendance({
      staffId,
      workDate,
    });

    const rest = await fetchRest({
      staffId,
      workDate,
    });

    return {
      attendance,
      rest,
    };
  }
);

export const registerClockIn = createAsyncThunk(
  "timeRecorder/registerClockIn",
  async ({
    staffId,
    workDate,
    startTime,
    goDirectlyFlag,
  }: {
    staffId: number;
    workDate: number;
    startTime: dayjs.Dayjs;
    goDirectlyFlag: boolean;
  }) => {
    const attendance = await attendanceRegisterClockIn({
      staffId,
      workDate,
      startTime,
      goDirectlyFlag,
    })
      .then((r) => r)
      .catch(() => null);

    return attendance;
  }
);

export const registerClockOut = createAsyncThunk(
  "timeRecorder/registerClockOut",
  async ({
    staffId,
    workDate,
    endTime,
    returnDirectlyFlag,
  }: {
    staffId: number;
    workDate: number;
    endTime: dayjs.Dayjs;
    returnDirectlyFlag: boolean;
  }) =>
    attendanceRegisterClockOut({
      staffId,
      workDate,
      endTime: endTime.toISOString(),
      returnDirectlyFlag,
    })
);

export const registerRestStart = createAsyncThunk(
  "timeRecorder/registerRestStart",
  async ({
    staffId,
    workDate,
    startTime,
  }: {
    staffId: number;
    workDate: number;
    startTime: dayjs.Dayjs;
  }) =>
    restRegisterStart({
      staffId,
      workDate,
      startTime: startTime.toISOString(),
    })
);

export const registerRestEnd = createAsyncThunk(
  "timeRecorder/registerRestEnd",
  async ({
    staffId,
    workDate,
    endTime,
  }: {
    staffId: number;
    workDate: number;
    endTime: dayjs.Dayjs;
  }) =>
    restRegisterEnd({
      staffId,
      workDate,
      endTime: endTime.toISOString(),
    })
);

export const registerRemarks = createAsyncThunk(
  "timeRecorder/registerRemarks",
  async ({
    staffId,
    workDate,
    remarks,
  }: {
    staffId: number;
    workDate: number;
    remarks: string;
  }) => {
    await attendanceRegisterRemarks({
      staffId,
      workDate,
      remarks,
    });
  }
);

const getExtraReducers = (
  builder: ActionReducerMapBuilder<TimeRecorderState>
) => {
  builder
    .addCase(fetchCurrentData.fulfilled, (state, action) => {
      state.status = TimeRecorderStatus.DONE;
      state.workStatus = getCurrentWorkStatus(
        action.payload.attendance,
        action.payload.rest
      );
      state.data = action.payload;
    })
    .addCase(fetchCurrentData.rejected, (state) => {
      state.status = TimeRecorderStatus.ERROR;
      state.workStatus = {
        code: WorkStatusCodes.ERROR,
        text: WorkStatusTexts.ERROR,
      };
      state.data = {
        attendance: null,
        rest: null,
      };
    });

  builder
    .addCase(registerClockIn.pending, (state) => {
      state.status = TimeRecorderStatus.PROCESSING;
      state.workStatus = {
        code: WorkStatusCodes.PROCESSING,
        text: WorkStatusTexts.PROCESSING,
      };
    })
    .addCase(registerClockIn.fulfilled, (state, action) => {
      state.status = TimeRecorderStatus.DONE;
      state.workStatus = {
        code: WorkStatusCodes.WORKING,
        text: WorkStatusTexts.WORKING,
      };
      state.data.attendance = action.payload;
    })
    .addCase(registerClockIn.rejected, (state) => {
      state.status = TimeRecorderStatus.ERROR;
      state.workStatus = {
        code: WorkStatusCodes.ERROR,
        text: WorkStatusTexts.ERROR,
      };
      state.data.attendance = null;
    });

  builder
    .addCase(registerClockOut.fulfilled, (state, action) => {
      state.status = TimeRecorderStatus.DONE;
      state.workStatus = {
        code: WorkStatusCodes.LEFT_WORK,
        text: WorkStatusTexts.LEFT_WORK,
      };
      state.data.attendance = action.payload;
    })
    .addCase(registerClockOut.rejected, (state) => {
      state.status = TimeRecorderStatus.ERROR;
      state.workStatus = {
        code: WorkStatusCodes.ERROR,
        text: WorkStatusTexts.ERROR,
      };
      state.data.attendance = null;
    });

  builder
    .addCase(registerRestStart.fulfilled, (state, action) => {
      state.status = TimeRecorderStatus.DONE;
      state.workStatus = {
        code: WorkStatusCodes.RESTING,
        text: WorkStatusTexts.RESTING,
      };
      state.data.rest = action.payload;
    })
    .addCase(registerRestStart.rejected, (state) => {
      state.status = TimeRecorderStatus.ERROR;
      state.workStatus = {
        code: WorkStatusCodes.ERROR,
        text: WorkStatusTexts.ERROR,
      };
      state.data.rest = null;
    });

  builder
    .addCase(registerRestEnd.fulfilled, (state, action) => {
      state.status = TimeRecorderStatus.DONE;
      state.workStatus = {
        code: WorkStatusCodes.WORKING,
        text: WorkStatusTexts.WORKING,
      };
      state.data.rest = action.payload;
    })
    .addCase(registerRestEnd.rejected, (state) => {
      state.status = TimeRecorderStatus.ERROR;
      state.workStatus = {
        code: WorkStatusCodes.ERROR,
        text: WorkStatusTexts.ERROR,
      };
      state.data.rest = null;
    });

  builder
    .addCase(registerRemarks.fulfilled, (state) => {
      state.status = TimeRecorderStatus.DONE;
    })
    .addCase(registerRemarks.rejected, (state) => {
      state.status = TimeRecorderStatus.ERROR;
      state.data.attendance = null;
    });
};

export const timeRecorderSlice = createSlice({
  name: "timeRecorder",
  initialState,
  reducers: {},
  extraReducers: (builder) => getExtraReducers(builder),
});
export default timeRecorderSlice.reducer;

export const testTimeRecorderSlice = (customInitialState: TimeRecorderState) =>
  createSlice({
    name: "timeRecorder",
    initialState: customInitialState,
    reducers: {},
    extraReducers: (builder) => getExtraReducers(builder),
  }).reducer;

export const selectTimeRecorder = (state: RootState) =>
  state.timeRecorderReducer;

export const handleClickClockInButton =
  ({
    staffId,
    goDirectlyFlag,
  }: {
    staffId: number | undefined;
    goDirectlyFlag: boolean;
  }): AppThunk =>
  (dispatch) => {
    if (staffId === undefined) {
      return;
    }

    const now = dayjs();
    const workDate = Number(now.format("YYYYMMDD"));
    const startTime = now;

    void dispatch(
      registerClockIn({ staffId, workDate, startTime, goDirectlyFlag })
    );
  };

export const handleClickClockOutButton =
  ({
    staffId,
    returnDirectlyFlag,
  }: {
    staffId: number | undefined;
    returnDirectlyFlag: boolean;
  }): AppThunk =>
  (dispatch) => {
    if (staffId === undefined) {
      return;
    }

    const now = dayjs();
    const workDate = Number(now.format("YYYYMMDD"));
    const endTime = now;

    void dispatch(
      registerClockOut({
        staffId,
        workDate,
        endTime,
        returnDirectlyFlag,
      })
    );
  };

export const handleClickRestStartButton =
  ({ staffId }: { staffId: number | undefined }): AppThunk =>
  (dispatch) => {
    if (staffId === undefined) {
      return;
    }

    const now = dayjs();
    const workDate = Number(now.format("YYYYMMDD"));
    const startTime = now;

    void dispatch(registerRestStart({ staffId, workDate, startTime }));
  };

export const handleClickRestEndButton =
  ({ staffId }: { staffId: number | undefined }): AppThunk =>
  (dispatch) => {
    if (staffId === undefined) {
      return;
    }

    const now = dayjs();
    const workDate = Number(now.format("YYYYMMDD"));
    const endTime = now;

    void dispatch(
      registerRestEnd({
        staffId,
        workDate,
        endTime,
      })
    );
  };

export const handleClickOfRemarksSaveButton =
  ({
    staffId,
    remarks,
  }: {
    staffId: number | undefined;
    remarks: string;
  }): AppThunk =>
  (dispatch) => {
    if (staffId === undefined) {
      return;
    }

    const now = dayjs();
    const workDate = Number(now.format("YYYYMMDD"));

    void dispatch(
      registerRemarks({
        staffId,
        workDate,
        remarks,
      })
    );
  };
