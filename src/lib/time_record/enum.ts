export enum TimeRecordStatus {
  BEFORE_WORK = "BEFORE_WORK",
  WORKING = "WORKING",
  RESTING = "RESTING",
  LEFT_WORK = "LEFT_WORK",
  ERROR = "ERROR",
  PROCESSING = "PROCESSING",
}

export const TimeRecordStatusList = {
  BEFORE_WORK: "出勤前",
  WORKING: "勤務中",
  RESTING: "休憩中",
  LEFT_WORK: "退勤済み",
  ERROR: "エラー",
  PROCESSING: "処理中",
};
