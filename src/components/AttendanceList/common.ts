import dayjs from "dayjs";

import { DayOfWeek } from "@/lib/DayOfWeek";

import { Attendance, HolidayCalendar, Rest } from "../../API";

// --------------------------------------------------
//  日付
// --------------------------------------------------
export function makeWorkDate(
  workDate: Attendance["workDate"],
  holidayCalendars: HolidayCalendar[]
) {
  const dayOfWeek = new DayOfWeek(holidayCalendars).getLabel(workDate);

  const date = dayjs(workDate);

  return `${date.format("M/D")}(${dayOfWeek})`;
}

// --------------------------------------------------
//  勤務開始時間
// --------------------------------------------------
export function makeWorkStartTime(
  startTime: Attendance["startTime"],
  paidHolidayFlag: Attendance["paidHolidayFlag"]
) {
  if (paidHolidayFlag) return "09:00";
  return !startTime ? "" : dayjs(startTime).format("HH:mm");
}

// --------------------------------------------------
//  勤務終了時間
// --------------------------------------------------
export function makeWorkEndTime(
  endTime: Attendance["endTime"],
  paidHolidayFlag: Attendance["paidHolidayFlag"]
) {
  if (paidHolidayFlag) return "18:00";
  return !endTime ? "" : dayjs(endTime).format("HH:mm");
}

// --------------------------------------------------
//  休憩時間の合計
// --------------------------------------------------
export function calcRestTotalTime(
  workStartTime: Attendance["startTime"],
  workEndTime: Attendance["endTime"],
  paidHolidayFlag: Attendance["paidHolidayFlag"],
  rests: Rest[]
) {
  if (paidHolidayFlag) return "01:00";
  if (!workStartTime && !workEndTime) return "";
  if (rests.length === 0) return "00:00";

  const restTimeTotal = rests.reduce((acc, cur) => {
    const { startTime, endTime } = cur;
    if (!startTime || !endTime) return acc;

    const restTimeDiff = dayjs(endTime).diff(dayjs(startTime), "minute");
    return acc + restTimeDiff;
  }, 0);

  const totalTime = Math.floor(restTimeTotal / 60);
  const formatHour = totalTime.toString().padStart(2, "0");
  const formatMinute = (restTimeTotal % 60).toString().padStart(2, "0");
  return `${formatHour}:${formatMinute}`;
}

// --------------------------------------------------
//  勤務時間の合計
// --------------------------------------------------
export function calcWorkTimeTotal(
  workDate: Attendance["workDate"],
  startTime: Attendance["startTime"],
  endTime: Attendance["endTime"],
  paidHolidayFlag: Attendance["paidHolidayFlag"],
  rests: Rest[]
) {
  if (paidHolidayFlag) return "08:00";
  if (!startTime && !endTime) return "";

  if (!startTime || !endTime) {
    const todayStr = dayjs().format("YYYY-MM-DD");
    return todayStr === workDate ? "(計算中)" : "--:--";
  }

  const workTimeDiff = dayjs(endTime).diff(dayjs(startTime), "minute");

  const restTimeTotal = rests.reduce((acc, cur) => {
    const { startTime: restStartTime, endTime: restEndTime } = cur;
    if (!restStartTime || !restEndTime) return acc;

    const restStart = dayjs(restStartTime);
    const restEnd = dayjs(restEndTime);
    const restTime = restEnd.diff(restStart, "minute");
    return acc + restTime;
  }, 0);

  const workTimeTotal = workTimeDiff - restTimeTotal;
  const formatHour = Math.floor(workTimeTotal / 60)
    .toString()
    .padStart(2, "0");
  const formatMinute = (workTimeTotal % 60).toString().padStart(2, "0");
  return `${formatHour}:${formatMinute}`;
}
