import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { AttendanceEditorInputs } from "./common";

export default function GoDirectlyFlagInput({
  control,
  setValue,
  workDate,
}: {
  control: Control<AttendanceEditorInputs, any>;
  setValue: UseFormSetValue<AttendanceEditorInputs>;
  workDate: dayjs.Dayjs | null;
}) {
  if (!workDate) {
    return null;
  }

  const startTime = workDate
    .hour(9)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toISOString();

  return (
    <Controller
      name="goDirectlyFlag"
      control={control}
      render={({ field }) => (
        <Checkbox
          {...field}
          checked={field.value || false}
          onChange={() => {
            setValue("startTime", !field.value ? startTime : null);
            field.onChange(!field.value);
          }}
        />
      )}
    />
  );
}
