import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

export default function RestStartItem({
  workStatus,
  onClick,
}: {
  workStatus: WorkStatus | null;
  onClick: () => void;
}) {
  return (
    <Button
      color="rest"
      label="休憩開始"
      onClick={onClick}
      variant="text"
      disabled={workStatus?.code !== WorkStatusCodes.WORKING}
    />
  );
}
