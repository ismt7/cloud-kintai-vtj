import dayjs from "dayjs";
import { Attendance } from "../../client";

export enum DayOfWeek {
  Sun = "日",
  Mon = "月",
  Tue = "火",
  Wed = "水",
  Thu = "木",
  Fri = "金",
  Sat = "土",
}

function getDayOfWeek(workDate: Attendance["work_date"]) {
  if (!workDate) {
    return "";
  }

  const weekList = Object.values(DayOfWeek);

  const dayOfWeek = dayjs(workDate).day();
  return weekList[dayOfWeek];
}

export default getDayOfWeek;
