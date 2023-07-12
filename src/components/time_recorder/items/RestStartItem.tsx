import { useAppDispatchV2 } from "../../../app/hooks";
import Button from "../../button/Button";
import { handleClickRestStartButton } from "../TimeRecorderSlice";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

interface RestStartItemProps {
  staffId: number | undefined;
  workStatus: WorkStatus;
}

export default function RestStartItem({
  staffId,
  workStatus,
}: RestStartItemProps) {
  const dispatch = useAppDispatchV2();

  const handleClick = () => {
    void dispatch(
      handleClickRestStartButton({
        staffId,
      })
    );
  };

  return (
    <Button
      color="rest"
      label="休憩開始"
      onClick={handleClick}
      variant="text"
      disabled={workStatus.code !== WorkStatusCodes.WORKING}
    />
  );
}
