import { Rest, UpdateAttendanceInput } from "../../API";

export type RestInputs = {
  startTime: Rest["startTime"] | null;
  endTime: Rest["endTime"] | null;
};

export type AttendanceEditInputs = {
  startTime: UpdateAttendanceInput["startTime"];
  endTime: UpdateAttendanceInput["endTime"];
  paidHolidayFlag: UpdateAttendanceInput["paidHolidayFlag"];
  goDirectlyFlag: UpdateAttendanceInput["goDirectlyFlag"];
  returnDirectlyFlag: UpdateAttendanceInput["returnDirectlyFlag"];
  remarks: UpdateAttendanceInput["remarks"];
  rests: RestInputs[];
};

export const defaultValues: AttendanceEditInputs = {
  startTime: undefined,
  endTime: undefined,
  paidHolidayFlag: undefined,
  goDirectlyFlag: undefined,
  returnDirectlyFlag: undefined,
  remarks: undefined,
  rests: [],
};
