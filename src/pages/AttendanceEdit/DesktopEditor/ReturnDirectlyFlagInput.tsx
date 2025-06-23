import ReturnDirectlyFlagInputBase from "@/components/common/ReturnDirectlyFlagInputBase";
import { useContext } from "react";

import { AttendanceEditContext } from "../AttendanceEditProvider";

export default function ReturnDirectlyFlagInput() {
  const { control, changeRequests } = useContext(AttendanceEditContext);
  if (!control) return null;
  return (
    <ReturnDirectlyFlagInputBase
      control={control}
      disabled={changeRequests.length > 0}
    />
  );
}
