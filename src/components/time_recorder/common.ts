import {
  Attendance,
  Rest,
  TimeRecordStatus,
  TimeRecordStatusList,
} from "../../lib/timeRecordSlice";

export function getWorkStatusCode(
  attendanceData: Attendance | undefined,
  restData: Rest | undefined
): TimeRecordStatus {
  // 出勤前
  if (
    !attendanceData ||
    (!attendanceData.start_time && !attendanceData.end_time)
  ) {
    return TimeRecordStatus.BEFORE_WORK;
  }

  // 勤務中
  if (attendanceData.start_time && !attendanceData.end_time) {
    if (!restData || (restData.start_time && restData.end_time)) {
      return TimeRecordStatus.WORKING;
    }
  }

  // 休憩中
  if (attendanceData.start_time && !attendanceData.end_time) {
    if (restData && restData.start_time && !restData.end_time) {
      return TimeRecordStatus.RESTING;
    }
  }

  // 勤務終了
  if (attendanceData.start_time && attendanceData.end_time) {
    return TimeRecordStatus.LEFT_WORK;
  }

  return TimeRecordStatus.ERROR;
}

export function getWorkStatusText(status_code: TimeRecordStatus): string {
  return TimeRecordStatusList[status_code];
}
