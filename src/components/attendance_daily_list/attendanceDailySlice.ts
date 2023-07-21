import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { AttendanceApi, RestApi, Staff, StaffApi } from "../../api";
// eslint-disable-next-line import/no-cycle
import { RootState } from "../../app/store";
import { OriginAttendance } from "../../lib/time_record/FetchAttendance";
import { OriginRest } from "../../lib/time_record/FetchRest";
import {
  GetConfiguration,
  mappedOriginAttendance,
  mappedOriginRest,
} from "../time_recorder/TimeRecorderAPI";
import { getCurrentWorkStatus } from "../time_recorder/WorkStatusCodes";

export enum AttendanceDailyStatus {
  NOT_PROCESSING = "NOT PROCESSING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export interface AttendanceDailyProps {
  id: number;
  fullName: string;
  workStatus: string;
  clockInTime: string;
  clockOutTime: string;
  totalWorkHoursPerMonth: string;
  operatingRate: string;
  totalWorkDaysPerMonth: number;
}

export interface AttendanceDailyState {
  status: AttendanceDailyStatus;
  attendances: AttendanceDailyProps[];
  staffs: Staff[] | undefined;
}

const initialState: AttendanceDailyState = {
  status: AttendanceDailyStatus.NOT_PROCESSING,
  attendances: [],
  staffs: undefined,
};

function getWorkStatus(
  latestData: OriginAttendance | undefined,
  rests: OriginRest[] | undefined
) {
  return getCurrentWorkStatus(
    latestData ?? null,
    rests ? rests[rests.length - 1] : null
  ).text;
}

function getClockInTime(latestData: OriginAttendance | undefined) {
  if (latestData?.startTime === undefined) return "";

  return dayjs(latestData?.startTime).format("HH:mm");
}

function getClockOutTime(latestData: OriginAttendance | undefined) {
  if (latestData?.endTime === undefined) return "";

  return dayjs(latestData?.endTime).format("HH:mm");
}

function getTotalWorkHoursPerMonth(
  attendance: OriginAttendance[],
  rests: OriginRest[] | undefined
) {
  // 勤務時間を計算
  const totalWorkTime = attendance.reduce((acc, cur) => {
    if (!cur.startTime && !cur.endTime) return acc;

    const workStart = dayjs(cur.startTime);

    // 退勤時刻がない場合かつ、18:00以降の場合は、18:00を退勤時刻とする
    const workEnd = (() => {
      if (cur.endTime) {
        return dayjs(cur.endTime);
      }

      const eighteen = dayjs().hour(18).minute(0).second(0);
      return eighteen.isBefore(workStart) ? eighteen : workStart;
    })();

    const workTime = workEnd.diff(workStart, "hour");

    return acc + workTime;
  }, 0);

  // 休憩時間を計算
  const totalRestTime =
    rests?.reduce((acc, cur) => {
      const restStart = dayjs(cur.startTime);
      const restEnd = dayjs(cur.endTime);
      const restDiff = restEnd.diff(restStart, "hour");

      return acc + restDiff;
    }, 0) ?? 0;

  return (totalWorkTime - totalRestTime).toFixed(2);
}

function getOperatingRate(attendance: OriginAttendance[]) {
  // 勤務日数を計算
  const workedDays =
    attendance.filter(
      (a) => a.startTime !== undefined && a.endTime !== undefined
    )?.length ?? 0;

  return `${((workedDays / 22) * 100).toFixed(0)}`;
}

function getTotalWorkDaysPerMonth(attendance: OriginAttendance[]) {
  const workedDays =
    attendance.filter(
      (a) => a.startTime !== undefined && a.endTime !== undefined
    )?.length ?? 0;

  return workedDays;
}

export const fetchAttendances = createAsyncThunk(
  "attendanceDaily/fetchAttendances",
  async ({
    fromWorkDate,
    toWorkDate,
  }: {
    fromWorkDate: number;
    toWorkDate: number;
  }) => {
    // スタッフ一覧を取得
    const staffApi = new StaffApi(GetConfiguration());
    const staffs = await staffApi
      .getStaffs()
      .then((responses) => responses.map((res) => res))
      .catch((e) => {
        throw e;
      });

    const attendanceApi = new AttendanceApi(GetConfiguration());
    const restApi = new RestApi(GetConfiguration());

    const dailyList = await Promise.all(
      staffs.map(async (staff) => {
        const { staffId } = staff;

        // 勤務データを取得
        const attendances = await attendanceApi
          .getAttendances({
            staffId,
            fromWorkDate,
            toWorkDate,
          })
          .then((responses) => responses.map((r) => mappedOriginAttendance(r)))
          .catch((e) => {
            throw e;
          });

        // 今日の勤務データを取得
        const today = dayjs();
        const todayAttendance = attendances.find((a) => {
          const workDate = dayjs(a.workDate);
          return (
            workDate.year() === today.year() &&
            workDate.month() === today.month() &&
            workDate.date() === today.date()
          );
        });

        // 休憩データを取得
        const rests = await restApi
          .getRests({
            staffId,
            fromWorkDate,
            toWorkDate,
          })
          .then((responses) => responses.map((r) => mappedOriginRest(r)))
          .catch((e) => {
            throw e;
          });

        // 今日の休憩データを取得
        const todayRests = rests.filter((r) => {
          const workDate = dayjs(r.workDate);
          return (
            workDate.year() === today.year() &&
            workDate.month() === today.month() &&
            workDate.date() === today.date()
          );
        });

        return {
          id: staff.staffId,
          fullName: `${staff.lastName} ${staff.firstName}`,
          workStatus: getWorkStatus(todayAttendance, todayRests),
          clockInTime: getClockInTime(todayAttendance),
          clockOutTime: getClockOutTime(todayAttendance),
          totalWorkHoursPerMonth: getTotalWorkHoursPerMonth(attendances, rests),
          operatingRate: getOperatingRate(attendances),
          totalWorkDaysPerMonth: getTotalWorkDaysPerMonth(attendances),
        };
      })
    );

    return dailyList;
  }
);

const getExtraReducers = (
  builder: ActionReducerMapBuilder<AttendanceDailyState>
) => {
  builder
    .addCase(fetchAttendances.pending, (state) => {
      state.status = AttendanceDailyStatus.PROCESSING;
    })
    .addCase(fetchAttendances.fulfilled, (state, action) => {
      state.status = AttendanceDailyStatus.DONE;
      state.attendances = action.payload;
    })
    .addCase(fetchAttendances.rejected, (state) => {
      state.status = AttendanceDailyStatus.ERROR;
      state.attendances = [];
    });
};

const attendanceDailySlice = createSlice({
  name: "attendanceDaily",
  initialState,
  reducers: {},
  extraReducers: (builder) => getExtraReducers(builder),
});

export default attendanceDailySlice.reducer;

export const testAttendanceDailySlice = (
  customInitialState: AttendanceDailyState
) =>
  createSlice({
    name: "attendanceDaily",
    initialState: customInitialState,
    reducers: {},
    extraReducers: (builder) => getExtraReducers(builder),
  });

export const selectAttendanceDaily = (state: RootState) =>
  state.attendanceDailyReducer;
