import dayjs from "dayjs";
import { rest } from "msw";
import { StaffCreate } from "../../api";
import MockStaffList from "../staff_list/data/StaffList";

const MOCK_STAFF_ID = 999;
const REACT_APP_BASE_PATH = process.env.REACT_APP_BASE_PATH || "";
const today = dayjs().format("YYYYMMDD");

export const getAttendancesHandler200 = () =>
  rest.get(
    `${REACT_APP_BASE_PATH}/attendances/${MOCK_STAFF_ID}/${today}`,
    (req, res, ctx) => res(ctx.status(200), ctx.json({}))
  );

export const getRestHandler200 = () =>
  rest.get(
    `${REACT_APP_BASE_PATH}/rests/${MOCK_STAFF_ID}/${today}`,
    (req, res, ctx) => res(ctx.status(200), ctx.json({}))
  );

export const postAttendancesClockInHandler200 = () =>
  rest.post(
    `${REACT_APP_BASE_PATH}/attendances/${MOCK_STAFF_ID}/${today}/clock_in`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          attendance_id: 1,
          staff_id: MOCK_STAFF_ID,
          work_date: "2023-01-01",
          start_time: "2023-01-01T09:00:00",
          end_time: null,
          go_directly_flag: false,
          return_directly_flag: false,
          remarks: "",
        })
      )
  );

export const patchAttendancesClockOutHandler200 = () =>
  rest.patch(
    `${REACT_APP_BASE_PATH}/attendances/${MOCK_STAFF_ID}/${today}/clock_out`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          attendance_id: 1,
          staff_id: MOCK_STAFF_ID,
          work_date: "2023-01-01",
          start_time: "2023-01-01T09:00:00",
          end_time: "2023-01-01T18:00:00",
          go_directly_flag: false,
          return_directly_flag: false,
          remarks: "",
        })
      )
  );

export const getStaffHandler200 = () =>
  rest.get(
    `${REACT_APP_BASE_PATH}/staffs/email/ishimoto%40virtualtech.jp`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          last_name: "田中",
          first_name: "太郎",
          mail_address: "ishimoto@virtulatech.jp",
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
      )
  );

export const putStaffHandler200 = () =>
  rest.put(`${REACT_APP_BASE_PATH}/staffs/${MOCK_STAFF_ID}`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        staff_id: MOCK_STAFF_ID,
        last_name: "田中",
        first_name: "太郎",
        mail_address: "tanaka2@example.com",
        icon_path: undefined,
        staff_roles: {
          role_id: 2,
          staff_id: MOCK_STAFF_ID,
          role: {
            role_name: "スタッフ",
          },
        },
      })
    )
  );

export const postStaffHandler200 = () =>
  rest.post(`${REACT_APP_BASE_PATH}/staffs`, async (req, res, ctx) => {
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

export const getStaffList200 = () =>
  rest.get(`${REACT_APP_BASE_PATH}/staffs`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(MockStaffList))
  );

export const postRestStartHandler200 = () =>
  rest.post(
    `${REACT_APP_BASE_PATH}/rests/${MOCK_STAFF_ID}/${today}/start`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          staff_id: MOCK_STAFF_ID,
          work_date: "2023-01-01",
          start_time: "2023-01-01T12:00:00",
          end_time: null,
        })
      )
  );

export const patchStaffRoleHandler200 = () =>
  rest.patch(
    `${REACT_APP_BASE_PATH}/staffs/${MOCK_STAFF_ID}/role`,
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

export const patchRestEndHandler200 = () =>
  rest.patch(
    `${REACT_APP_BASE_PATH}/rests/${MOCK_STAFF_ID}/${today}/end`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          restTimeId: 1,
          staff_id: MOCK_STAFF_ID,
          work_date: "2023-01-01",
          start_time: "2023-01-01T12:00:00",
          end_time: "2023-01-01T13:00:00",
        })
      )
  );

export const patchRemarksHandler200 = () =>
  rest.patch(
    `${REACT_APP_BASE_PATH}/attendances/${MOCK_STAFF_ID}/${today}/remarks`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          attendance_id: 1,
          staff_id: MOCK_STAFF_ID,
          work_date: "2023-01-01",
          start_time: "2023-01-01T09:00:00",
          end_time: null,
          go_directly_flag: false,
          return_directly_flag: false,
          remarks: "これはモックAPIからレスポンスされたデータです。",
        })
      )
  );
