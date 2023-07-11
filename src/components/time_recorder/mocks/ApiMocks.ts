import dayjs from "dayjs";
import { rest } from "msw";

import {
  AttendanceClockIn,
  AttendanceClockOut,
  RestEnd,
  RestStart,
  StaffCreate,
  UpdateRemarksRequest,
} from "../../../api";
import MockStaffList from "../../staff_list/data/StaffList";

const MOCK_STAFF_ID = 999;
export const REACT_APP_BASE_PATH = process.env.REACT_APP_BASE_PATH || "";
const today = dayjs().format("YYYYMMDD");

type MemoryStorage = {
  attendance_start_time?: Date;
  attendance_end_time?: Date;
  rest_start_time?: Date;
};

const memoryStorage: MemoryStorage = {};

export const getAttendancesHandler200 = () =>
  rest.get(
    `${REACT_APP_BASE_PATH}/v1/attendances/:staffId/${today}`,
    (req, res, ctx) => res(ctx.status(200), ctx.json({}))
  );

export const getRestHandler200 = () =>
  rest.get(
    `${REACT_APP_BASE_PATH}/v1/rests/:staffId/${today}`,
    (req, res, ctx) => res(ctx.status(200), ctx.json({}))
  );

// ============================================================
//  出勤
// ============================================================
export const postAttendancesClockInHandler200 = () =>
  rest.post(
    `${REACT_APP_BASE_PATH}/v1/attendances/${MOCK_STAFF_ID}/${today}/clock_in`,
    async (req, res, ctx) => {
      const requestData: AttendanceClockIn = await req.json();

      memoryStorage.attendance_start_time = requestData.startTime;

      return res(
        ctx.status(200),
        ctx.json({
          attendance_id: 1,
          staff_id: MOCK_STAFF_ID,
          work_date: dayjs(requestData.startTime).format("YYYY-MM-DD"),
          start_time: dayjs(requestData.startTime).toISOString(),
          end_time: null,
          go_directly_flag: requestData.goDirectlyFlag,
          return_directly_flag: false,
          remarks: "",
        })
      );
    }
  );

// ============================================================
//  退勤
// ============================================================
export const patchAttendancesClockOutHandler200 = () =>
  rest.patch(
    `${REACT_APP_BASE_PATH}/v1/attendances/${MOCK_STAFF_ID}/${today}/clock_out`,
    async (req, res, ctx) => {
      const requestData: AttendanceClockOut = await req.json();

      memoryStorage.attendance_end_time = requestData.endTime;

      return res(
        ctx.status(200),
        ctx.json({
          attendance_id: 1,
          staff_id: MOCK_STAFF_ID,
          work_date: dayjs(requestData.endTime).format("YYYY-MM-DD"),
          start_time: dayjs(memoryStorage.attendance_start_time).toISOString(),
          end_time: dayjs(requestData.endTime).toISOString(),
          go_directly_flag: false,
          return_directly_flag: false,
          remarks: "",
        })
      );
    }
  );

// ============================================================
//  休憩開始
// ============================================================
export const postRestStartHandler200 = () =>
  rest.post(
    `${REACT_APP_BASE_PATH}/v1/rests/${MOCK_STAFF_ID}/${today}/start`,
    async (req, res, ctx) => {
      const requestData: RestStart = await req.json();

      return res(
        ctx.status(200),
        ctx.json({
          staff_id: MOCK_STAFF_ID,
          rest_time_id: 1,
          work_date: dayjs(requestData.startTime).format("YYYY-MM-DD"),
          start_time: dayjs(requestData.startTime).toISOString(),
          end_time: null,
        })
      );
    }
  );

// ============================================================
//  休憩終了
// ============================================================
export const patchRestEndHandler200 = () =>
  rest.patch(
    `${REACT_APP_BASE_PATH}/v1/rests/${MOCK_STAFF_ID}/${today}/end`,
    async (req, res, ctx) => {
      const requestData: RestEnd = await req.json();

      return res(
        ctx.status(200),
        ctx.json({
          restTimeId: 1,
          staff_id: MOCK_STAFF_ID,
          work_date: dayjs(requestData.endTime).format("YYYY-MM-DD"),
          start_time: dayjs(memoryStorage.rest_start_time).toISOString(),
          end_time: dayjs(requestData.endTime).toISOString(),
        })
      );
    }
  );

// ============================================================
//  備考更新
// ============================================================
export const patchRemarksHandler200 = () =>
  rest.patch(
    `${REACT_APP_BASE_PATH}/v1/attendances/${MOCK_STAFF_ID}/${today}/remarks`,
    async (req, res, ctx) => {
      const requestData: UpdateRemarksRequest = await req.json();

      return res(
        ctx.status(200),
        ctx.json({
          attendance_id: 1,
          staff_id: MOCK_STAFF_ID,
          work_date: dayjs(today).format("YYYY-MM-DD"),
          start_time: dayjs(memoryStorage.attendance_start_time).toISOString(),
          end_time: dayjs(memoryStorage.attendance_end_time).toISOString(),
          go_directly_flag: false,
          return_directly_flag: false,
          remarks: requestData.attendanceRemarks,
        })
      );
    }
  );

export const getStaffHandler200 = () =>
  rest.get(`${REACT_APP_BASE_PATH}/v1/staffs/email/:email`, (req, res, ctx) => {
    const { params } = req;
    const email = String(params.email);
    return res(
      ctx.status(200),
      ctx.json({
        last_name: "田中",
        first_name: "太郎",
        mail_address: email,
        icon_path: undefined,
        staff_id: MOCK_STAFF_ID,
        staff_roles: {
          role_id: 2,
          staff_id: MOCK_STAFF_ID,
          role: {
            role_name: "スタッフ",
          },
        },
      })
    );
  });

export const putStaffHandler200 = () =>
  rest.put(`${REACT_APP_BASE_PATH}/v1/staffs/:staffId`, (req, res, ctx) => {
    const { params } = req;
    const staffId = Number(params.staffId);
    return res(
      ctx.status(200),
      ctx.json({
        staff_id: staffId,
        last_name: "田中",
        first_name: "太郎",
        mail_address: "tanaka2@example.com",
        icon_path: undefined,
        staff_roles: {
          role_id: 2,
          staff_id: staffId,
          role: {
            role_name: "スタッフ",
          },
        },
      })
    );
  });

export const postStaffHandler200 = () =>
  rest.post(`${REACT_APP_BASE_PATH}/v1/staffs`, async (req, res, ctx) => {
    const request = await req.json<StaffCreate>();

    return res(
      ctx.status(200),
      ctx.json({
        staff_id: MOCK_STAFF_ID,
        last_name: request.lastName,
        first_name: request.firstName,
        mail_address: request.mailAddress,
        icon_path: undefined,
        staff_roles: {
          role_id: 2,
          staff_id: MOCK_STAFF_ID,
          role: {
            role_name: "スタッフ",
          },
        },
      })
    );
  });

export const deleteStaffHandler200 = () =>
  rest.delete(`${REACT_APP_BASE_PATH}/v1/staffs/:staffId`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(null))
  );

export const getStaffList200 = () =>
  rest.get(`${REACT_APP_BASE_PATH}/v1/staffs`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(MockStaffList))
  );

export const patchStaffRoleHandler200 = () =>
  rest.patch(
    `${REACT_APP_BASE_PATH}/v1/staffs/${MOCK_STAFF_ID}/role`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          role_id: 3,
          staff_id: 2,
          role: {
            role_name: "スタッフ管理者",
          },
        })
      )
  );

export const getWorkPeriodPerMonthHandler200 = () =>
  rest.get(
    `${REACT_APP_BASE_PATH}/v1/master/work_period_per_month`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json([
          {
            work_period_per_month_id: 1,
            target_month: "2023-01-01",
            job_start_date: "2023-01-15",
            job_end_date: "2023-02-15",
          },
          {
            work_period_per_month_id: 2,
            target_month: "2023-02-01",
            job_start_date: "2023-02-15",
            job_end_date: "2023-03-16",
          },
        ])
      )
  );
