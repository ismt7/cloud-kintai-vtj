import { Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { AttendanceEditInputs } from "../../common";
import { Label } from "../Label";
import StartTimeInput from "../../DesktopEditor/WorkTimeInput/StartTimeInput";
import EndTimeInput from "./EndTimeInput";
import { Attendance } from "../../../../API";

export function WorkTimeInput({
  workDate,
  attendance,
  control,
  setValue,
  getValues,
  watch,
}: {
  workDate: dayjs.Dayjs;
  attendance: Attendance | null | undefined;
  control: Control<AttendanceEditInputs, any>;
  setValue: UseFormSetValue<AttendanceEditInputs>;
  getValues: UseFormGetValues<AttendanceEditInputs>;
  watch: UseFormWatch<AttendanceEditInputs>;
}) {
  return (
    <>
      <Label>勤務時間</Label>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        開始時刻
      </Typography>
      <StartTimeInput
        workDate={workDate}
        control={control}
        setValue={setValue}
      />
      <Divider />
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        終了時刻
      </Typography>
      <EndTimeInput
        workDate={workDate}
        control={control}
        setValue={setValue}
        getValues={getValues}
        watch={watch}
      />
    </>
  );
}
