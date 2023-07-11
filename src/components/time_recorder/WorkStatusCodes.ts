import { OriginAttendance } from "../../lib/time_record/FetchAttendance";
import { OriginRest } from "../../lib/time_record/FetchRest";

export enum WorkStatusCodes {
  PROCESSING = "PROCESSING",
  BEFORE_WORK = "BEFORE_WORK",
  WORKING = "WORKING",
  RESTING = "RESTING",
  LEFT_WORK = "LEFT_WORK",
  ERROR = "ERROR",
}

export enum WorkStatusTexts {
  PROCESSING = "処理中",
  BEFORE_WORK = "出勤前",
  WORKING = "勤務中",
  RESTING = "休憩中",
  LEFT_WORK = "勤務終了",
  ERROR = "エラー",
}

export interface WorkStatus {
  code: WorkStatusCodes;
  text: WorkStatusTexts;
}

function isWorking(
  attendance: OriginAttendance | null,
  rest: OriginRest | null
) {
  if (!attendance) return false;

  if (rest) {
    if (rest.startTime && !rest.endTime) {
      return false;
    }
  }

  if (!attendance.startTime) {
    return false;
  }

  if (attendance.endTime) return false;

  return true;
}

function isResting({
  attendance,
  rest,
}: {
  attendance: OriginAttendance | null;
  rest: OriginRest | null;
}) {
  if (!attendance) return false;
  if (!attendance.startTime) return false;
  if (attendance.endTime) return false;

  if (!rest) return false;
  if (!rest.startTime) return false;
  if (rest.endTime) return false;

  return true;
}

function isLeaveWork(attendance: OriginAttendance | null) {
  if (!attendance) return false;
  if (!attendance.startTime) return false;
  if (!attendance.endTime) return false;

  return true;
}

export function getCurrentWorkStatus(
  attendance: OriginAttendance | null,
  rest: OriginRest | null
): WorkStatus {
  if (isWorking(attendance, rest)) {
    return {
      code: WorkStatusCodes.WORKING,
      text: WorkStatusTexts.WORKING,
    };
  }

  if (isResting({ attendance, rest })) {
    return {
      code: WorkStatusCodes.RESTING,
      text: WorkStatusTexts.RESTING,
    };
  }

  if (isLeaveWork(attendance)) {
    return {
      code: WorkStatusCodes.LEFT_WORK,
      text: WorkStatusTexts.LEFT_WORK,
    };
  }

  return {
    code: WorkStatusCodes.BEFORE_WORK,
    text: WorkStatusTexts.BEFORE_WORK,
  };
}
