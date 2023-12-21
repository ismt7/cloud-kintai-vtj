import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../common";

export default function ClockInItem({
  workStatus,
  onClick,
}: {
  workStatus: WorkStatus | null;
  onClick: () => void;
}) {
  return (
    <Button
      color="clock_in"
      label="勤務開始"
      onClick={onClick}
      size="large"
      variant={
        workStatus?.code === WorkStatusCodes.BEFORE_WORK
          ? "outlined"
          : "contained"
      }
      disabled={workStatus?.code !== WorkStatusCodes.BEFORE_WORK}
    />
  );
}
