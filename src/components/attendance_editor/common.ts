import {
  Attendance,
  AttendanceChangeRequest,
  AttendanceHistory,
  Rest,
} from "../../API";

export type RestInputs = {
  startTime: Rest["startTime"] | null;
  endTime: Rest["endTime"] | null;
};

export type AttendanceEditorInputs = {
  workDate: Attendance["workDate"] | null;
  goDirectlyFlag: Attendance["goDirectlyFlag"];
  returnDirectlyFlag: Attendance["returnDirectlyFlag"];
  startTime: Attendance["startTime"];
  endTime: Attendance["endTime"];
  remarks: Attendance["remarks"];
  paidHolidayFlag: Attendance["paidHolidayFlag"];
  rests: RestInputs[];
  histories: AttendanceHistory[];
  changeRequests: AttendanceChangeRequest[];
  revision: Attendance["revision"];
};

export const defaultValues: AttendanceEditorInputs = {
  workDate: null,
  goDirectlyFlag: false,
  returnDirectlyFlag: false,
  startTime: null,
  endTime: null,
  remarks: "",
  paidHolidayFlag: false,
  rests: [],
  histories: [],
  changeRequests: [],
  revision: 0,
};
