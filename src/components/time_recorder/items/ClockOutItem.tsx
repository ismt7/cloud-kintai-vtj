import { useEffect, useState } from "react";
import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../common";

export default function ClockOutItem({
  workStatus,
  onClick,
}: {
  workStatus: WorkStatus | null;
  onClick: () => void;
}) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(workStatus?.code !== WorkStatusCodes.WORKING);
  }, [workStatus]);

  return (
    <Button
      color="clock_out"
      label="勤務終了"
      onClick={() => {
        setDisabled(true);
        onClick();
      }}
      size="large"
      variant={
        workStatus?.code === WorkStatusCodes.WORKING ? "outlined" : "contained"
      }
      disabled={disabled}
    />
  );
}
