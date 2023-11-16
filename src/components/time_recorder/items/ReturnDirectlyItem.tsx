import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

export default function ReturnDirectly({
  workStatus,
  onClick,
}: {
  workStatus: WorkStatus | null;
  onClick: () => void;
}) {
  return (
    <Button
      color="clock_out"
      label="直帰"
      onClick={onClick}
      variant="text"
      disabled={workStatus?.code !== WorkStatusCodes.WORKING}
    />
  );
}
