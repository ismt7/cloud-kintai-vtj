import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

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

dayjs.extend(utc);

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
    .catch((e) => {
      throw e;
    });

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

  return `${Math.trunc(elapsedTime / 60)}:${`0${elapsedTime % 60}`.slice(-2)}`;
}

function getWorkElapsedTime(matchedAttendance: OriginAttendance) {
  return dayjs
    .utc(matchedAttendance.endTime)
    .diff(dayjs.utc(matchedAttendance.startTime), "minute");
}

function getRestTimeTotal(restTime: number) {
  return `${Math.trunc(restTime / 60)}:${`0${restTime % 60}`.slice(-2)}`;
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

      const startTime = matchedAttendance.startTime
        ? dayjs.utc(matchedAttendance.startTime).local()
        : undefined;
      const endTime = matchedAttendance.endTime
        ? dayjs.utc(matchedAttendance.endTime).local()
        : undefined;

      timeRecordList.push({
        id: i,
        staffId: matchedAttendance.staffId,
        workDate: dayjs.utc(matchedAttendance.workDate).format("M/D"),
        clockInTime: startTime?.format("HH:mm"),
        clockOutTime: endTime?.format("HH:mm"),
        dayOfWeek: dayOfWeeks[dayjs.utc(matchedAttendance.workDate).day()],
        workTimeTotal: startTime && endTime ? workTimeTotal : "0:00",
        restTimeTotal: startTime && endTime ? restTimeTotal : "0:00",
        summary: matchedAttendance.remarks,
      } as TimeRecordList);
    }

    return timeRecordList;
  }
);
export default fetchTimeRecordList;
