import dayjs from "dayjs";
import { rest } from "msw";

export function GetLoginStaff() {
  return rest.get("/staff/cognito/:cognitoUserId", (req, res, ctx) => {
    const { params } = req;
    const cognitoUserId = Number(params.cognitoUserId);

    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        last_name: "テスト",
        first_name: "太郎",
        mail_address: "test@example.com",
        icon_path: "",
        cognito_user_id: cognitoUserId,
        created_at: dayjs().format("YYYY-MM-DDTHH:mm:ssZ"),
        updated_at: null,
        created_by: 2,
        updated_by: null,
      })
    );
  });
}

export function GetAttendanceList() {
  return rest.get(
    "/staff/:staffId/:fromDate/:toDate/attendances",
    (req, res, ctx) => {
      const { params } = req;
      const staffId = Number(params.staffId);
      const fromDate = dayjs(params.fromDate as string);
      const toDate = dayjs(params.toDate as string);

      return res(
        ctx.status(200),
        ctx.json(
          (() => {
            const responses = [];
            for (
              let date = fromDate, i = 1;
              date.isBefore(toDate);
              date = date.add(1, "d"), i += 1
            ) {
              responses.push({
                id: i,
                staff_id: staffId,
                work_date: date.format("YYYY-MM-DD"),
                start_time: `${date.format("YYYY-MM-DD")}T09:00:00+09:00`,
                end_time: `${date.format("YYYY-MM-DD")}T18:00:00+09:00`,
                go_directly_flag: false,
                return_directly_flag: false,
                remarks: "ここは備考です",
                created_at: dayjs().format("YYYY-MM-DDTHH:mm:ssZ"),
                updated_at: null,
                created_by: 2,
                updated_by: null,
              });
            }

            return responses;
          })()
        )
      );
    }
  );
}

export function GetRestList() {
  return rest.get("/staff/:staffId/:fromDate/:toDate/rest", (req, res, ctx) => {
    const { params } = req;
    const staffId = Number(params.staffId);
    const fromDate = dayjs(params.fromDate as string);
    const toDate = dayjs(params.toDate as string);

    return res(
      ctx.status(200),
      ctx.json(
        (() => {
          const responses = [];
          for (
            let date = fromDate;
            date.isBefore(toDate);
            date = date.add(1, "d")
          ) {
            responses.push({
              id: 1,
              staff_id: staffId,
              work_date: date.format("YYYY-MM-DD"),
              start_time: date.hour(12).minute(0).second(0).toISOString(),
              end_time: date.hour(13).minute(0).second(0).toISOString(),
              created_at: dayjs().toISOString(),
              updated_at: null,
              created_by: 2,
              updated_by: null,
            });
          }

          return responses;
        })()
      )
    );
  });
}
