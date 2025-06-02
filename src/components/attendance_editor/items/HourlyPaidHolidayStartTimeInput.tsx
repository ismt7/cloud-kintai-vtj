import { FieldArrayWithId } from "react-hook-form";

import HourlyPaidHolidayTimeInput from "./HourlyPaidHolidayTimeInput";

import { AttendanceEditInputs } from "@/pages/AttendanceEdit/common";

export default function HourlyPaidHolidayStartTimeInput({
  index,
  time,
}: {
  index: number;
  time: FieldArrayWithId<AttendanceEditInputs, "hourlyPaidHolidayTimes", "id">;
}) {
  return (
    <HourlyPaidHolidayTimeInput
      index={index}
      time={time}
      fieldKey="startTime"
      label="開始時刻"
    />
  );
}
