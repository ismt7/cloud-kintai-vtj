import dayjs from "dayjs";
import { rest } from "msw";

const now = dayjs();
const fromDate = now.subtract(30, "d");

const REACT_APP_BASE_PATH = process.env.REACT_APP_BASE_PATH || "";

export function GetAttendanceList() {
  return rest.get(
    `${REACT_APP_BASE_PATH}/v1/attendances/999/${fromDate.format(
      "YYYYMMDD"
    )}/${now.format("YYYYMMDD")}`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json(
          (() => {
            const data = [];
            for (let i = 0; i < 10; i += 1) {
              const targetDate = now.subtract(Math.abs(i - 9), "d");
              const isHoliday = [0, 6].indexOf(targetDate.day()) !== -1;

              // eslint-disable-next-line no-continue
              if (isHoliday) continue;

              data.push({
                attendance_id: i + 1,
                parent_attendance_id: null,
                staff_id: 1,
                work_date: targetDate.format("YYYY-MM-DD"),
                start_time: `${targetDate.format("YYYY-MM-DD")}T09:00:00+09:00`,
                end_time: `${targetDate.format("YYYY-MM-DD")}T18:00:00+09:00`,
                go_directly_flag: false,
                return_directly_flag: false,
                remarks: isHoliday ? "" : "備考です",
              });
            }
            return data;
          })()
        )
      )
  );
}

export function GetRestList() {
  return rest.get(
    `${REACT_APP_BASE_PATH}/v1/rests/999/${fromDate.format(
      "YYYYMMDD"
    )}/${now.format("YYYYMMDD")}`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json(
          (() => {
            const data = [];
            for (let i = 0; i < 10; i += 1) {
              const targetDate = now.subtract(Math.abs(i - 9), "d");
              const isHoliday = [0, 6].indexOf(targetDate.day()) !== -1;

              // eslint-disable-next-line no-continue
              if (isHoliday) continue;

              data.push({
                rest_time_id: i + 1,
                staff_id: 1,
                work_date: targetDate.format("YYYY-MM-DD"),
                start_time: `${targetDate.format("YYYY-MM-DD")}T12:00:00+09:00`,
                end_time: `${targetDate.format("YYYY-MM-DD")}T13:00:00+09:00`,
              });
            }
            return data;
          })()
        )
      )
  );
}
