import dayjs from "dayjs";
import { rest } from "msw";
import { REACT_APP_BASE_PATH } from "../../time_recorder/mocks/ApiMocks";
import StaffMockData from "./StaffMockData";

export function getStaffsHandler200() {
  return rest.get(`${REACT_APP_BASE_PATH}/v1/staffs`, async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(StaffMockData))
  );
}

export function getAttendancesHandler200() {
  return rest.get(
    `${REACT_APP_BASE_PATH}/v1/attendances/:staffId/:fromWorkDate/:toWorkDate`,
    async (req, res, ctx) => {
      const { params } = req;
      const staffId = String(params.staffId);

      const fromWorkDate = dayjs(String(params.fromWorkDate));
      const toWorkDate = dayjs(String(params.toWorkDate));

      const attendanceDailyList = [];
      let attendanceId = 1;
      for (
        let currentDate = fromWorkDate;
        currentDate.isBefore(toWorkDate);
        currentDate = currentDate.add(1, "day")
      ) {
        // 土日は除外
        if (currentDate.day() === 0 || currentDate.day() === 6) {
          continue;
        }

        const isToWorkDate = currentDate.isSame(toWorkDate.subtract(1, "day"));

        attendanceDailyList.push({
          attendance_id: Number(staffId + `0${attendanceId}`.slice(-2)),
          parent_attendance_id: null,
          staff_id: staffId,
          work_date: currentDate.format("YYYY-MM-DD"),
          start_time:
            Number(staffId) % 993 === 0 && isToWorkDate
              ? null
              : `${currentDate.format("YYYY-MM-DD")}T09:00:00+09:00`,
          end_time:
            Number(staffId) % 2 === 0 && isToWorkDate
              ? null
              : `${currentDate.format("YYYY-MM-DD")}T18:00:00+09:00`,
          go_directly_flag: false,
          return_directly_flag: false,
          remarks: "備考です",
        });

        attendanceId += 1;
      }

      return res(ctx.status(200), ctx.json(attendanceDailyList));
    }
  );
}

export function getRestsHandler200() {
  return rest.get(
    `${REACT_APP_BASE_PATH}/v1/rests/:staffId/:fromWorkDate/:toWorkDate`,
    async (req, res, ctx) => {
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
