import { useAppDispatchV2 } from "../../../app/hooks";
import Button from "../../button/Button";
import { handleClickClockOutButton } from "../TimeRecorderSlice";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

interface ClockOutItemProps {
  staffId: number | undefined;
  workStatus: WorkStatus;
}

export default function ClockOutItem({
  staffId,
  workStatus,
}: ClockOutItemProps) {
  const dispatch = useAppDispatchV2();

  const handleClick = () => {
    void dispatch(
      handleClickClockOutButton({
        staffId,
        returnDirectlyFlag: false,
      })
    );
  };

  return (
    <Button
      color="clock_out"
      label="勤務終了"
      onClick={handleClick}
      size="large"
      variant={
        workStatus.code === WorkStatusCodes.WORKING ? "outlined" : "contained"
      }
      disabled={workStatus.code !== WorkStatusCodes.WORKING}
    />
  );
}
