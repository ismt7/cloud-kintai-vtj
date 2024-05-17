import { Switch } from "@mui/material";
import { Control, Controller } from "react-hook-form";

import { AttendanceEditInputs } from "../common";
import { Label } from "./Label";

export function GoDirectlyFlagInput({
  control,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
}) {
  return (
    <>
      <Label variant="body1">直行</Label>
      <Controller
        name="goDirectlyFlag"
        control={control}
        render={({ field }) => (
          <Switch checked={field.value || false} {...field} />
        )}
      />
    </>
  );
}
