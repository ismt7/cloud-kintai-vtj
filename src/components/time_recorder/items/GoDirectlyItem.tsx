import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../common";

export default function GoDirectlyItem({
  workStatus,
  onClick,
}: {
  workStatus: WorkStatus | null;
  onClick: () => void;
}) {
  return (
    <Button
      color="clock_in"
      label="直行"
      onClick={onClick}
      variant="text"
      disabled={workStatus?.code !== WorkStatusCodes.BEFORE_WORK}
    />
  );
}
