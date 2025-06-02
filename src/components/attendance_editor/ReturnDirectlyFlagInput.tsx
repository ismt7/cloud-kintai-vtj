import ReturnDirectlyFlagInputBase from "@/components/common/ReturnDirectlyFlagInputBase";
import { useContext } from "react";
import { AttendanceDateTime } from "@/lib/AttendanceDateTime";
import { AttendanceEditContext } from "@/pages/AttendanceEdit/AttendanceEditProvider";

export default function ReturnDirectlyFlagInput() {
  const { workDate, control, setValue } = useContext(AttendanceEditContext);
  if (!workDate || !control || !setValue) return null;
  const endTime = new AttendanceDateTime()
    .setDate(workDate)
    .setWorkEnd()
    .toISOString();
  return (
    <ReturnDirectlyFlagInputBase
      control={control}
      onChangeFlag={(checked) => setValue("endTime", checked ? endTime : null)}
    />
  );
}
