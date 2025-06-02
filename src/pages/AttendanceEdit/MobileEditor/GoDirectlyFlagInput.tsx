import { Switch } from "@mui/material";
import { useContext } from "react";

import { GoDirectlyFlagCheckbox } from "@/components/attendance_editor/GoDirectlyFlagCheckbox";

import { AttendanceEditContext } from "../AttendanceEditProvider";

export function GoDirectlyFlagInput() {
  const context = useContext(AttendanceEditContext);
  const control = context?.control;

  if (!control) {
    return null;
  }

  return (
    <GoDirectlyFlagCheckbox
      name="goDirectlyFlag"
      control={control}
      inputComponent={Switch}
    />
  );
}
