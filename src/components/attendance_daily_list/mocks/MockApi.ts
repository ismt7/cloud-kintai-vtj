import dayjs from "dayjs";
import { rest } from "msw";
import StaffMockData from "./StaffMockData";

export function getStaffsHandler200(noData = false) {
  return rest.get("/staffs", async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(noData ? [] : StaffMockData))
  );
}

export function getAttendancesHandler200(noData = false) {
  return rest.get(
    "/staff/:staffId/:fromWorkDate/:toWorkDate/attendances",
    async (req, res, ctx) => {
      if (noData) {
        return res(ctx.status(200), ctx.json([]));
      }

      const { params } = req;
      const staffId = String(params.staffId);

      const fromWorkDate = dayjs(String(params.fromWorkDate));
      const toWorkDate = dayjs(String(params.toWorkDate));

      const attendanceDailyList = [];
      let attendanceId = 1;

      for (
        let currentDate = fromWorkDate;
        currentDate.isBefore(toWorkDate.add(1, "day"));
        currentDate = currentDate.add(1, "day")
      ) {
        // 土日は除外
        if (currentDate.day() === 0 || currentDate.day() === 6) {
          continue;
        }

        const isToWorkDate = currentDate.isSame(toWorkDate.subtract(1, "day"));

        const startTime =
          Number(staffId) % 993 === 0 && isToWorkDate
            ? null
            : `${currentDate
                .hour(9)
                .minute(0)
                .second(0)
                .format("YYYY-MM-DDTHH:mm:ssZ")}`;

        const endTime =
          Number(staffId) % 2 === 0 && isToWorkDate
            ? null
            : `${currentDate
                .hour(18)
                .minute(0)
                .second(0)
                .format("YYYY-MM-DDTHH:mm:ssZ")}`;

        attendanceDailyList.push({
          staff_id: Number(staffId),
          work_date: currentDate.format("YYYY-MM-DD"),
          start_time: startTime,
          end_time: endTime,
          go_directly_flag: false,
          return_directly_flag: false,
          remarks: "備考です",
          id: Number(staffId + `0${attendanceId}`.slice(-2)),
          created_at: currentDate.format("YYYY-MM-DDTHH:mm:ssZ"),
          updated_at: null,
          created_by: Number(staffId),
          updated_by: null,
        });

        attendanceId += 1;
      }

      return res(ctx.status(200), ctx.json(attendanceDailyList));
    }
  );
}

export function getRestsHandler200(noData = false) {
  return rest.get(
    "/staff/:staffId/:fromWorkDate/:toWorkDate/rest",
    async (req, res, ctx) => {
      if (noData) {
        return res(ctx.status(200), ctx.json([]));
      }

      const { params } = req;
      const { staffId } = params;

      const fromWorkDate = dayjs(String(params.fromWorkDate));
      const toWorkDate = dayjs(String(params.toWorkDate));

      const restList = [];
      let restId = 1;
      for (
        let currentDate = fromWorkDate;
        currentDate.isBefore(toWorkDate);
        currentDate = currentDate.add(1, "day")
      ) {
        // 土日は除外
        if (currentDate.day() === 0 || currentDate.day() === 6) {
          continue;
        }

        restList.push({
          rest_id: Number(String(staffId) + `0${restId}`.slice(-2)),
          parent_rest_id: null,
          staff_id: staffId,
          work_date: currentDate.format("YYYY-MM-DD"),
          start_time: `${currentDate.format("YYYY-MM-DD")}T12:00:00+09:00`,
          end_time: `${currentDate.format("YYYY-MM-DD")}T13:00:00+09:00`,
          remarks: "備考です",
        });

        restId += 1;
      }

      return res(ctx.status(200), ctx.json(restList));
    }
  );
}
