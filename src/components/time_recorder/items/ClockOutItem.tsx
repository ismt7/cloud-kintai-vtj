import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../common";

export default function ClockOutItem({
  workStatus,
  onClick,
}: {
  workStatus: WorkStatus | null;
  onClick: () => void;
}) {
  return (
    <Button
      color="clock_out"
      label="勤務終了"
      onClick={onClick}
      size="large"
      variant={
        workStatus?.code === WorkStatusCodes.WORKING ? "outlined" : "contained"
      }
      disabled={workStatus?.code !== WorkStatusCodes.WORKING}
    />
  );
}
