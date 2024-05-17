import { Switch } from "@mui/material";
import { Control, Controller } from "react-hook-form";

import { AttendanceEditInputs } from "../common";
import { Label } from "./Label";

export function PaidHolidayFlagInput({
  control,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
}) {
  return (
    <>
      <Label variant="body1">有給休暇</Label>
      <Controller
        name="paidHolidayFlag"
        control={control}
        render={({ field }) => (
          <Switch
            {...field}
            checked={field.value || false}
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
}
