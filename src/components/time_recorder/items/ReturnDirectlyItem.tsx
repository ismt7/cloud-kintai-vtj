import { useAppDispatchV2 } from "../../../app/hooks";
import Button from "../../button/Button";
import { handleClickClockOutButton } from "../TimeRecorderSlice";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

interface ReturnDirectlyItemProps {
  staffId: number | undefined;
  workStatus: WorkStatus;
}

export default function ReturnDirectly({
  staffId,
  workStatus,
}: ReturnDirectlyItemProps) {
  const dispatch = useAppDispatchV2();

  const handleClick = () => {
    void dispatch(
      handleClickClockOutButton({
        staffId,
        returnDirectlyFlag: true,
      })
    );
  };

  return (
    <Button
      color="clock_out"
      label="直帰"
      onClick={handleClick}
      variant="text"
      disabled={workStatus.code !== WorkStatusCodes.WORKING}
    />
  );
}
