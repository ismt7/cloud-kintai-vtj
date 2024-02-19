import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

import { AttendanceEditorInputs } from "./common";

export default function PaidHolidayFlagInput({
  workDate,
  control,
  setValue,
}: {
  workDate: dayjs.Dayjs | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditorInputs, any>;
  setValue: UseFormSetValue<AttendanceEditorInputs>;
}) {
  if (!workDate) return null;

  return (
    <Controller
      name="paidHolidayFlag"
      control={control}
      render={({ field }) => (
        <Checkbox
          {...field}
          checked={field.value || false}
          onChange={(e) => {
            setValue("paidHolidayFlag", e.target.checked);
            field.onChange(e);

            if (!e.target.checked) return;

            const startTime = workDate
              .hour(9)
              .minute(0)
              .second(0)
              .millisecond(0)
              .toISOString();
            setValue("startTime", startTime);

            const endTime = workDate
              .hour(18)
              .minute(0)
              .second(0)
              .millisecond(0)
              .toISOString();
            setValue("endTime", endTime);

            const restStartTime = workDate
              .hour(12)
              .minute(0)
              .second(0)
              .millisecond(0)
              .toISOString();
            const restEndTime = workDate
              .hour(13)
              .minute(0)
              .second(0)
              .millisecond(0)
              .toISOString();

            setValue("rests", [
              {
                startTime: restStartTime,
                endTime: restEndTime,
              },
            ]);
          }}
        />
      )}
    />
  );
}
