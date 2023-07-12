import { useAppDispatchV2 } from "../../../app/hooks";
import Button from "../../button/Button";
import { handleClickClockInButton } from "../TimeRecorderSlice";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

interface ClockInItemProps {
  staffId: number | undefined;
  workStatus: WorkStatus;
}

export default function ClockInItem({ staffId, workStatus }: ClockInItemProps) {
  const dispatch = useAppDispatchV2();

  const handleClick = () => {
    void dispatch(
      handleClickClockInButton({
        staffId,
        goDirectlyFlag: false,
      })
    );
  };

  return (
    <Button
      color="clock_in"
      label="勤務開始"
      onClick={handleClick}
      size="large"
      variant={
        workStatus.code === WorkStatusCodes.BEFORE_WORK
          ? "outlined"
          : "contained"
      }
      disabled={workStatus.code !== WorkStatusCodes.BEFORE_WORK}
    />
  );
}
