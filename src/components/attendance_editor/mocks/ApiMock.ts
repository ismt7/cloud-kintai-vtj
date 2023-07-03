import dayjs from "dayjs";
import { rest } from "msw";
import { REACT_APP_BASE_PATH } from "../../time_recorder/mocks/ApiMocks";

const MOCK_STAFF_ID = 999;

export function GetStaff200() {
  return rest.get(
    `${REACT_APP_BASE_PATH}/v1/staffs/${MOCK_STAFF_ID}`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          staff_id: 999,
          last_name: "田中",
          first_name: "太郎",
          mail_address: "tanaka@example.com",
          icon_path: "",
          staff_roles: {
            role_id: 2,
            staff_id: 999,
            role: {
              role_name: "スタッフ",
            },
          },
        })
      )
  );
}

export function GetAttendance200() {
  const now = dayjs();

  return rest.get(
    `${REACT_APP_BASE_PATH}/v1/attendances/${MOCK_STAFF_ID}/${now.format(
      "YYYYMMDD"
    )}`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          attendance_id: 1,
          parent_attendance_id: null,
          staff_id: 999,
          work_date: now.format("YYYY-MM-DD"),
          start_time: `${now.format("YYYY-MM-DD")}T09:00:00+09:00`,
          end_time: `${now.format("YYYY-MM-DD")}T18:00:00+09:00`,
          go_directly_flag: false,
          return_directly_flag: false,
          remarks: "備考です",
        })
      )
  );
}

export function GetRests200() {
  const now = dayjs();

  const fromDate = now.format("YYYYMMDD");
  const toDate = fromDate;

  return rest.get(
    `${REACT_APP_BASE_PATH}/v1/rests/${MOCK_STAFF_ID}/${fromDate}/${toDate}`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json([
          {
            staff_id: MOCK_STAFF_ID,
            rest_time_id: 1,
            work_date: now.format("YYYY-MM-DD"),
            start_time: `${now.format("YYYY-MM-DD")}T12:00:00+09:00`,
            end_time: `${now.format("YYYY-MM-DD")}T13:00:00+09:00`,
          },
          {
            staff_id: MOCK_STAFF_ID,
            rest_time_id: 2,
            work_date: now.format("YYYY-MM-DD"),
            start_time: `${now.format("YYYY-MM-DD")}T15:00:00+09:00`,
            end_time: `${now.format("YYYY-MM-DD")}T15:30:00+09:00`,
          },
        ])
      )
  );
}
