import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AttendanceState,
  AttendanceStatus,
} from "../reducers/attendanceReducer";
import { RestState, RestStatus } from "../reducers/restReducer";
import { StaffState, StaffStatus } from "../reducers/staffSlice";
// eslint-disable-next-line import/no-cycle
import { TimeRecordStatus } from "../reducers/timeRecordSlice";

const isError = (
  staff: StaffState,
  attendance: AttendanceState,
  rest: RestState
) => {
  if (staff.status === StaffStatus.ERROR) {
    return true;
  }

  if (attendance.status === AttendanceStatus.ERROR) {
    return true;
  }

  if (rest.status === RestStatus.ERROR) {
    return true;
  }

  return false;
};

const isBeforeWork = (attendance: AttendanceState) => {
  if (!attendance.data) {
    return true;
  }

  if (!attendance.data?.startTime) {
    return true;
  }

  return false;
};

const isProcessing = (
  staff: StaffState,
  attendance: AttendanceState,
  rest: RestState
) => {
  const staffStatus =
    [StaffStatus.NOT_PROCESSING, StaffStatus.PROCESSING].indexOf(
      staff.status
    ) !== -1;
  if (staffStatus) return true;

  const attendanceStatus =
    [AttendanceStatus.NOT_PROCESSING, AttendanceStatus.PROCESSING].indexOf(
      attendance.status
    ) !== -1;
  if (attendanceStatus) return true;

  const restStatus =
    [RestStatus.NOT_PROCESSING, RestStatus.PROCESSING].indexOf(rest.status) !==
    -1;
  if (restStatus) return true;

  return false;
};

const isWorking = (attendance: AttendanceState, rest: RestState) => {
  if (!attendance.data) return false;

  if (rest.data) {
    if (rest.data.startTime && !rest.data.endTime) {
      return false;
    }
  }

  if (!attendance.data.startTime) {
    return false;
  }

  if (attendance.data.endTime) return false;

  return true;
};

const isResting = (attendance: AttendanceState, rest: RestState) => {
  if (!attendance.data) return false;
  if (!attendance.data.startTime) return false;
  if (attendance.data.endTime) return false;

  if (!rest.data) return false;
  if (!rest.data.startTime) return false;
  if (rest.data.endTime) return false;

  return true;
};

const getTimeRecordStatus = createAsyncThunk(
  "timeRecord/getTimeRecordStatus",
  ({
    staff,
    attendance,
    rest,
  }: {
    staff: StaffState;
    attendance: AttendanceState;
    rest: RestState;
  }) => {
    // エラー
    if (isError(staff, attendance, rest)) {
      return TimeRecordStatus.ERROR;
    }

    // 処理前と処理中
    if (isProcessing(staff, attendance, rest)) {
      return TimeRecordStatus.PROCESSING;
    }

    // 出勤前
    if (isBeforeWork(attendance)) {
      return TimeRecordStatus.BEFORE_WORK;
    }

    // 勤務中
    if (isWorking(attendance, rest)) {
      return TimeRecordStatus.WORKING;
    }

    // 休憩中
    if (isResting(attendance, rest)) {
      return TimeRecordStatus.RESTING;
    }

    // 勤務終了
    if (attendance.data?.startTime && attendance.data?.endTime) {
      return TimeRecordStatus.LEFT_WORK;
    }

    return TimeRecordStatus.ERROR;
  }
);

export default getTimeRecordStatus;
