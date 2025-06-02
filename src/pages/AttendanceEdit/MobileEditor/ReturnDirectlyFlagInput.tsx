import { Switch } from "@mui/material";
import { Control } from "react-hook-form";

import ReturnDirectlyFlagInputBase from "@/components/common/ReturnDirectlyFlagInputBase";

import { AttendanceEditInputs } from "../common";

export function ReturnDirectlyFlagInput({
  control,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
}) {
  return (
    <ReturnDirectlyFlagInputBase
      control={control}
      inputComponent={Switch}
      layout="inline"
    />
  );
}
