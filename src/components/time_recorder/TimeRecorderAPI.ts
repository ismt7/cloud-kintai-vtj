import dayjs from "dayjs";

import {
  Attendance,
  AttendanceApi,
  Configuration,
  Rest,
  RestApi,
} from "../../api";
// eslint-disable-next-line import/no-cycle
import { OriginAttendance } from "../../lib/time_record/FetchAttendance";
// eslint-disable-next-line import/no-cycle
import { OriginRest } from "../../lib/time_record/FetchRest";

function isNullDate(date: Date) {
  const nullDate = dayjs(0);
  const targetDate = dayjs(date);

  return nullDate.isSame(targetDate);
}

export const mappedOriginAttendance = (attendance: Attendance): OriginAttendance => ({
  attendanceId: attendance.attendanceId,
    parentAttendanceId: attendance.parentAttendanceId,
    staffId: attendance.staffId,
    workDate: isNullDate(attendance.workDate)
      ? undefined
      : dayjs(attendance.workDate).toISOString(),
    startTime: isNullDate(attendance.startTime)
      ? undefined
      : dayjs(attendance.startTime).toISOString(),
    endTime: isNullDate(attendance.endTime)
      ? undefined
      : dayjs(attendance.endTime).toISOString(),
    goDirectlyFlag: attendance.goDirectlyFlag,
    returnDirectlyFlag: attendance.returnDirectlyFlag,
    remarks: attendance.remarks,
});

export const mappedOriginRest = (rest: Rest): OriginRest => ({
  restTimeId: rest.restTimeId,
  parentRestTimeId: rest.parentRestTimeId,
  staffId: rest.staffId,
  workDate: isNullDate(rest.workDate)
    ? undefined
    : dayjs(rest.workDate).toISOString(),
  startTime: isNullDate(rest.startTime)
    ? undefined
    : dayjs(rest.startTime).toISOString(),
  endTime: isNullDate(rest.endTime || dayjs(0).toDate())
    ? undefined
    : dayjs(rest.endTime).toISOString(),
});

function getConfigration() {
  return new Configuration({
    basePath: process.env.REACT_APP_BASE_PATH,
  });
}

export async function fetchAttendance({
  staffId,
  workDate,
}: {
  staffId: number;
  workDate: number;
}): Promise<OriginAttendance | null> {
  const api = new AttendanceApi(getConfigration());
  const attendance = await api
    .getAttendance({
      staffId,
      workDate,
    })
    .then((r) => mappedOriginAttendance(r))
    .catch(() => null);
  if (attendance?.staffId === undefined) return null;
  if (attendance === null) return null;
  return attendance;
}

export async function fetchRest({
  staffId,
  workDate,
}: {
  staffId: number;
  workDate: number;
}): Promise<OriginRest | null> {
  const restApi = new RestApi(getConfigration());
  return restApi
    .getRest({
      staffId,
      workDate,
    })
    .then((r) => r)
    .then((r) => mappedOriginRest(r))
    .catch(() => null);
}

export async function attendanceRegisterClockIn({
  staffId,
  workDate,
  startTime,
  goDirectlyFlag,
}: {
  staffId: number;
  workDate: number;
  startTime: dayjs.Dayjs;
  goDirectlyFlag: boolean;
}): Promise<OriginAttendance | null> {
  if (!staffId) return null;

  const attendanceApi = new AttendanceApi(getConfigration());
  const attendance = await attendanceApi
    .registerClockIn({
      staffId,
      workDate,
      attendanceClockIn: {
        startTime: dayjs(startTime).toDate(),
        goDirectlyFlag,
      },
    })
    .then((r) => r)
    .catch(() => null);
  if (attendance === null) return null;

  return mappedOriginAttendance(attendance);
}

export async function attendanceRegisterClockOut({
  staffId,
  workDate,
  endTime,
  returnDirectlyFlag,
}: {
  staffId: number | undefined;
  workDate: number;
  endTime: string;
  returnDirectlyFlag: boolean;
}): Promise<OriginAttendance | null> {
  if (!staffId) return null;

  const attendanceApi = new AttendanceApi(getConfigration());
  const attendance = await attendanceApi
    .registerClockOut({
      staffId,
      workDate,
      attendanceClockOut: {
        endTime: dayjs(endTime).toDate(),
        returnDirectlyFlag,
      },
    })
    .then((r) => r)
    .catch(() => null);

  if (attendance === null) return null;

  return mappedOriginAttendance(attendance);
}

export async function restRegisterStart({
  staffId,
  workDate,
  startTime,
}: {
  staffId: number;
  workDate: number;
  startTime: string;
}) {
  const restApi = new RestApi(getConfigration());
  const rest = await restApi
    .registerStartRest({
      staffId,
      workDate,
      restStart: {
        startTime: dayjs(startTime).toDate(),
      },
    })
    .then((r) => r)
    .catch(() => null);

  if (rest === null) return null;

  return mappedOriginRest(rest);
}

export async function restRegisterEnd({
  staffId,
  workDate,
  endTime,
}: {
  staffId: number | undefined;
  workDate: number;
  endTime: string;
}) {
  if (!staffId) return null;

  const restApi = new RestApi(getConfigration());
  const rest = await restApi
    .registerEndRest({
      staffId,
      workDate,
      restEnd: {
        endTime: dayjs(endTime).toDate(),
      },
    })
    .then((r) => r)
    .catch(() => null);

  if (rest === null) return null;

  return mappedOriginRest(rest);
}

export async function attendanceRegisterRemarks({
  staffId,
  workDate,
  remarks,
}: {
  staffId: number | undefined;
  workDate: number;
  remarks: string;
}) {
  if (!staffId) return null;

  const attendanceApi = new AttendanceApi(getConfigration());
  const attendance = await attendanceApi
    .updateRemarks({
      staffId,
      workDate,
      attendanceRemarks: {
        remarks,
      },
    })
    .then((r) => r)
    .catch(() => null);

  if (attendance === null) return null;

  return mappedOriginAttendance(attendance);
}
