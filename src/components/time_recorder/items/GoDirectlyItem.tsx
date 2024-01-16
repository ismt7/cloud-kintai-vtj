import { useState, useEffect } from "react";
import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../common";

export default function GoDirectlyItem({
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
      label="直行"
      onClick={() => {
        setDisabled(true);
        onClick();
      }}
      variant="text"
      disabled={disabled}
    />
  );
}
