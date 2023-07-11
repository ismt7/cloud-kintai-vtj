import { useAppDispatchV2 } from "../../../app/hooks";
import Button from "../../button/Button";
import { handleClickRestEndButton } from "../TimeRecorderSlice";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

interface RestStartItemProps {
  staffId: number | undefined;
  workStatus: WorkStatus;
}

export default function RestEndItem({
  staffId,
  workStatus,
}: RestStartItemProps) {
  const dispatch = useAppDispatchV2();

  const handleClick = () => {
    void dispatch(
      handleClickRestEndButton({
        staffId,
      })
    );
  };

  return (
    <Button
      color="rest"
      label="休憩終了"
      onClick={handleClick}
      variant="text"
      disabled={workStatus.code !== WorkStatusCodes.RESTING}
    />
  );
}
