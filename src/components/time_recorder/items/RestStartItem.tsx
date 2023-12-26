import { useState, useEffect } from "react";
import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../common";

export default function RestStartItem({
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
      color="rest"
      label="休憩開始"
      onClick={() => {
        setDisabled(true);
        onClick();
      }}
      variant="text"
      disabled={disabled}
    />
  );
}
