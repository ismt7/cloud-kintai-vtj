import { Checkbox } from "@mui/material";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import dayjs from "dayjs";
import { AttendanceEditorInputs } from "./common";

export default function ReturnDirectlyFlagInput({
  control,
  setValue,
  workDate,
}: {
  control: Control<AttendanceEditorInputs, any>;
  setValue: UseFormSetValue<AttendanceEditorInputs>;
  workDate: dayjs.Dayjs | null;
}) {
  const endTime = workDate
    ?.hour(18)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toISOString();

  return (
    <Controller
      name="returnDirectlyFlag"
      control={control}
      render={({ field }) => (
        <Checkbox
          {...field}
          checked={field.value || false}
          onChange={() => {
            setValue("endTime", !field.value ? endTime : null);
            field.onChange(!field.value);
          }}
        />
      )}
    />
  );
}
