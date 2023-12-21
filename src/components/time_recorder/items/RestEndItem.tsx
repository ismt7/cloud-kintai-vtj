import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../common";

export default function RestEndItem({
  workStatus,
  onClick,
}: {
  workStatus: WorkStatus | null;
  onClick: () => void;
}) {
  return (
    <Button
      color="rest"
      label="休憩終了"
      onClick={onClick}
      variant="text"
      disabled={workStatus?.code !== WorkStatusCodes.RESTING}
    />
  );
}
