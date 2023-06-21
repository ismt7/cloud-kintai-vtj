import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { AttendanceApi, Configuration, RestApi } from "../../api";
import {
  mappedOriginAttendance,
  mappedOriginRest,
} from "../../components/time_recorder/TimeRecorderAPI";
import { OriginAttendance } from "../time_record/FetchAttendance";
import { OriginRest } from "../time_record/FetchRest";

export interface TimeRecordList {
  id: number;
  staffId: number;
  workDate: string;
  dayOfWeek: string;
  clockInTime: string | undefined;
  clockOutTime: string | undefined;
  workTimeTotal: string;
  restTimeTotal: string;
  summary: string;
}

const dayOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];

async function fetchAttendances(
  conf: Configuration,
  staffId: number,
  fromWorkDate: number,
  toWorkDate: number
): Promise<OriginAttendance[] | null> {
  const api = new AttendanceApi(conf);
  const attendances = await api
    .getAttendances({
      staffId,
      fromWorkDate,
      toWorkDate,
    })
    .then((r) => r)
    .catch(() => null);

  if (!attendances) return null;

  try {
    return attendances.map((attendance) => mappedOriginAttendance(attendance));
  } catch (error) {
    return null;
  }
}

async function fetchRests(
  conf: Configuration,
  staffId: number,
  fromWorkDate: number,
  toWorkDate: number
) {
  const api = new RestApi(conf);
  const rests = await api
    .getRests({
      staffId,
      fromWorkDate,
      toWorkDate,
    })
    .then((r) => r)
    .catch(() => null);

  if (!rests) return null;

  try {
    return rests.map((rest) => mappedOriginRest(rest));
  } catch (error) {
    return null;
  }
}

function findAttendance(
  attendances: OriginAttendance[] | null,
  date: dayjs.Dayjs
): OriginAttendance | undefined {
  return attendances?.find((attendance) => {
    const workDate = dayjs(attendance.workDate);
    return workDate.isSame(date, "day");
  });
}

function findRest(rests: OriginRest[] | null, date: dayjs.Dayjs) {
  return rests?.filter((rest) => {
    const workDate = dayjs(rest.workDate);
    return workDate.isSame(date, "day");
  });
}

function defaultTimeRecord(id: number, date: dayjs.Dayjs) {
  return {
    id,
    staffId: 0,
    workDate: date.format("M/D"),
    clockInTime: undefined,
    clockOutTime: undefined,
    dayOfWeek: dayOfWeeks[date.day()],
    workTimeTotal: "0:00",
    restTimeTotal: "0:00",
    summary: "",
  };
}

function getRestElapsedTime(matchedRests: OriginRest[] | undefined) {
  return (
    matchedRests?.reduce((sum, rest) => {
      const time = dayjs(rest.endTime).diff(dayjs(rest.startTime), "minute");
      return sum + time;
    }, 0) || 0
  );
}

function getWorkTimeTotal(attendanceTime: number, restTime: number) {
  const elapsedTime = attendanceTime - restTime;

  return `${Math.trunc(elapsedTime / 60)}:${`${elapsedTime % 60}`.slice(-2)}`;
}

function getWorkElapsedTime(matchedAttendance: OriginAttendance) {
  return dayjs(matchedAttendance.endTime).diff(
    dayjs(matchedAttendance.startTime),
    "minute"
  );
}

function getRestTimeTotal(restTime: number) {
  return `${Math.trunc(restTime / 60)}:${`${restTime % 60}`.slice(-2)}`;
}

const fetchTimeRecordList = createAsyncThunk(
  "timeRecordList/fetchTimeRecordList",
  async ({
    staffId,
    targetFromWorkDate,
    targetToWorkDate,
  }: {
    staffId: number;
    targetFromWorkDate: dayjs.Dayjs;
    targetToWorkDate: dayjs.Dayjs;
  }): Promise<TimeRecordList[]> => {
    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });

    const attendances = await fetchAttendances(
      conf,
      staffId,
      Number(targetFromWorkDate.format("YYYYMMDD")),
      Number(targetToWorkDate.format("YYYYMMDD"))
    );

    const rests = await fetchRests(
      conf,
      staffId,
      Number(targetFromWorkDate.format("YYYYMMDD")),
      Number(targetToWorkDate.format("YYYYMMDD"))
    );

    const timeRecordList: TimeRecordList[] = [];
    for (
      let date = targetFromWorkDate, i = 1;
      date <= targetToWorkDate;
      date = date.add(1, "day"), i += 1
    ) {
      const matchedAttendance = findAttendance(attendances, date);

      if (!matchedAttendance) {
        timeRecordList.push(defaultTimeRecord(i, date));
        // eslint-disable-next-line no-continue
        continue;
      }

      const matchedRests = findRest(rests, date);
      const restElapsedTime = getRestElapsedTime(matchedRests);
      const restTimeTotal = getRestTimeTotal(restElapsedTime);
      const attendanceElapsedTime = getWorkElapsedTime(matchedAttendance);
      const workTimeTotal = getWorkTimeTotal(
        attendanceElapsedTime,
        restElapsedTime
      );

      timeRecordList.push({
        id: i,
        staffId: matchedAttendance.staffId,
        workDate: dayjs(matchedAttendance.workDate).format("M/D"),
        clockInTime: matchedAttendance.startTime
          ? dayjs(matchedAttendance.startTime).format("HH:mm")
          : undefined,
        clockOutTime: matchedAttendance.endTime
          ? dayjs(matchedAttendance.endTime).format("HH:mm")
          : "",
        dayOfWeek: dayOfWeeks[dayjs(matchedAttendance.workDate).day()],
        workTimeTotal:
          matchedAttendance.startTime && matchedAttendance.endTime
            ? workTimeTotal
            : "",
        restTimeTotal:
          matchedAttendance.startTime && matchedAttendance.endTime
            ? restTimeTotal
            : "",
        summary: matchedAttendance.remarks,
      } as TimeRecordList);
    }

    return timeRecordList;
  }
);
export default fetchTimeRecordList;
