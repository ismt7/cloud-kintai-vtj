import dayjs from "dayjs";
import { rest } from "msw";
import { REACT_APP_BASE_PATH } from "../../time_recorder/mocks/ApiMocks";

export function GetStaff200() {
  return rest.get(
    `${REACT_APP_BASE_PATH}/v1/staffs/:staffId`,
    (req, res, ctx) => {
      const { params } = req;
      const staffId = Number(params.staffId);

      return res(
        ctx.status(200),
        ctx.json({
          staff_id: staffId,
          last_name: "田中",
          first_name: "太郎",
          mail_address: "tanaka@example.com",
          icon_path: "",
          staff_roles: {
            role_id: 2,
            staff_id: staffId,
            role: {
              role_name: "スタッフ",
            },
          },
        })
      );
    }
  );
}

export function GetAttendance200() {
  return rest.get(
    `${REACT_APP_BASE_PATH}/v1/attendances/:staffId/:workDate`,
    (req, res, ctx) => {
      const { params } = req;
      const staffId = Number(params.staffId);

      const now = dayjs();

      return res(
        ctx.status(200),
        ctx.json({
          attendance_id: 1,
          parent_attendance_id: null,
          staff_id: staffId,
          work_date: now.format("YYYY-MM-DD"),
          start_time: `${now.format("YYYY-MM-DD")}T09:00:00+09:00`,
          end_time: `${now.format("YYYY-MM-DD")}T18:00:00+09:00`,
          go_directly_flag: false,
          return_directly_flag: false,
          remarks: "備考です",
        })
      );
    }
  );
}

export function GetRests200() {
  return rest.get(
    `${REACT_APP_BASE_PATH}/v1/rests/:staffId/:fromWorkDate/:toWorkDate`,
    (req, res, ctx) => {
      const { params } = req;
      const staffId = Number(params.staffId);

      const now = dayjs();

      return res(
        ctx.status(200),
        ctx.json([
          {
            staff_id: staffId,
            rest_time_id: 1,
            work_date: now.format("YYYY-MM-DD"),
            start_time: `${now.format("YYYY-MM-DD")}T12:00:00+09:00`,
            end_time: `${now.format("YYYY-MM-DD")}T13:00:00+09:00`,
          },
          {
            staff_id: staffId,
            rest_time_id: 2,
            work_date: now.format("YYYY-MM-DD"),
            start_time: `${now.format("YYYY-MM-DD")}T15:00:00+09:00`,
            end_time: `${now.format("YYYY-MM-DD")}T15:30:00+09:00`,
          },
        ])
      );
    }
  );
}
