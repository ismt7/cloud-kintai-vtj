import { useAppDispatchV2 } from "../../../app/hooks";
import Button from "../../button/Button";
import { handleClickClockInButton } from "../TimeRecorderSlice";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

interface GoDirectlyItemProps {
  staffId: number | undefined;
  workStatus: WorkStatus;
}

export default function GoDirectlyItem({
  staffId,
  workStatus,
}: GoDirectlyItemProps) {
  const dispatch = useAppDispatchV2();

  const handleClick = () => {
    void dispatch(
      handleClickClockInButton({
        staffId,
        goDirectlyFlag: true,
      })
    );
  };
  return (
    <Button
      color="clock_in"
      label="直行"
      onClick={handleClick}
      variant="text"
      disabled={workStatus.code !== WorkStatusCodes.BEFORE_WORK}
    />
  );
}
