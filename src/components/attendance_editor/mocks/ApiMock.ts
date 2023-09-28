import dayjs from "dayjs";
import { rest } from "msw";

export function GetStaffByCognitoUserId200() {
  return rest.get("/staff/cognito/:cognitoUserId", (req, res, ctx) => {
    const { params } = req;
    const cognitoUserId = params.cognitoUserId as string;
    const now = dayjs();

    return res(
      ctx.status(200),
      ctx.json({
        id: 2,
        last_name: "田中",
        first_name: "太郎",
        mail_address: "tanaka@example.com",
        icon_path: "",
        cognito_user_id: cognitoUserId,
        created_at: now.format("YYYY-MM-DDTHH:mm:ssZ"),
        updated_at: null,
        created_by: 1,
        updated_by: null,
      })
    );
  });
}

export function GetStaff200() {
  return rest.get("/staff/:staffId", (req, res, ctx) => {
    const { params } = req;
    const staffId = Number(params.staffId);
    const now = dayjs();

    return res(
      ctx.status(200),
      ctx.json({
        id: staffId,
        last_name: "田中",
        first_name: "太郎",
        mail_address: "tanaka@example.com",
        icon_path: "",
        cognito_user_id: "99999999-9999-9999-9999-999999999999",
        created_at: now.format("YYYY-MM-DDTHH:mm:ssZ"),
        updated_at: null,
        created_by: 1,
        updated_by: null,
      })
    );
  });
}

export function GetAttendance200() {
  return rest.get(
    "/staff/:staffId/:fromDate/:toDate/attendances",
    (req, res, ctx) => {
      const { params } = req;
      const staffId = Number(params.staffId);
      const fromDate = dayjs(params.fromDate as string);
      const now = dayjs();

      const startTime = fromDate
        .hour(9)
        .minute(0)
        .second(0)
        .format("YYYY-MM-DDTHH:mm:ssZ");

      const endTime = fromDate
        .hour(18)
        .minute(0)
        .second(0)
        .format("YYYY-MM-DDTHH:mm:ssZ");

      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            staff_id: staffId,
            work_date: fromDate.format("YYYY-MM-DD"),
            start_time: startTime,
            end_time: endTime,
            go_directly_flag: false,
            return_directly_flag: false,
            remarks: "備考です",
            created_at: now.format("YYYY-MM-DDTHH:mm:ssZ"),
            updated_at: null,
            created_by: 2,
            updated_by: null,
          },
        ])
      );
    }
  );
}

export function GetRests200() {
  return rest.get("/staff/:staffId/:fromDate/:toDate/rest", (req, res, ctx) => {
    const { params } = req;
    const staffId = Number(params.staffId);
    const fromDate = dayjs(params.fromDate as string);
    const now = dayjs();

    const lunchStartTime = fromDate
      .hour(12)
      .minute(0)
      .second(0)
      .format("YYYY-MM-DDTHH:mm:ssZ");

    const lunchEndTime = fromDate
      .hour(13)
      .minute(0)
      .second(0)
      .format("YYYY-MM-DDTHH:mm:ssZ");

    const restStartTime = fromDate
      .hour(15)
      .minute(0)
      .second(0)
      .format("YYYY-MM-DDTHH:mm:ssZ");

    const restEndTime = fromDate
      .hour(15)
      .minute(30)
      .second(0)
      .format("YYYY-MM-DDTHH:mm:ssZ");

    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          staff_id: staffId,
          work_date: now.format("YYYY-MM-DD"),
          start_time: lunchStartTime,
          end_time: lunchEndTime,
          created_at: now.format("YYYY-MM-DDTHH:mm:ssZ"),
          updated_at: null,
          created_by: 2,
          updated_by: null,
        },
        {
          id: 2,
          staff_id: staffId,
          work_date: now.format("YYYY-MM-DD"),
          start_time: restStartTime,
          end_time: restEndTime,
          created_at: now.format("YYYY-MM-DDTHH:mm:ssZ"),
          updated_at: null,
          created_by: 2,
          updated_by: null,
        },
      ])
    );
  });
}
