import dayjs from "dayjs";

export function getNowISOStringWithZeroSeconds() {
  return dayjs().second(0).millisecond(0).toISOString();
}
