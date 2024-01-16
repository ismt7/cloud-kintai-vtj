import { useEffect, useState } from "react";
import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../common";

export default function ClockInItem({
  workStatus,
  onClick,
}: {
  workStatus: WorkStatus | null;
  onClick: () => void;
}) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(workStatus?.code !== WorkStatusCodes.BEFORE_WORK);
  }, [workStatus]);

  return (
    <Button
      color="clock_in"
      label="勤務開始"
      onClick={() => {
        setDisabled(true);
        onClick();
      }}
      size="large"
      variant={
        workStatus?.code === WorkStatusCodes.BEFORE_WORK
          ? "outlined"
          : "contained"
      }
      disabled={disabled}
    />
  );
}
