import dayjs from "dayjs";
import { Rest, Service, Staff } from "../../../client";
import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

interface RestStartItemProps {
  staffId: Staff["id"] | undefined;
  rest: Rest | null;
  workStatus: WorkStatus | null;
  callback: (value: Rest | null) => void;
}

async function restEnd({
  staffId,
  rest,
  callback,
}: {
  staffId: RestStartItemProps["staffId"];
  rest: RestStartItemProps["rest"];
  callback: (value: Rest | null) => void;
}) {
  if (!staffId || !rest) return;

  const now = dayjs();
  const { id: restId } = rest;
  const response = await Service.updateRest(
    restId,
    {
      ...rest,
      end_time: now.toISOString(),
    },
    staffId
  ).catch((error) => {
    console.log(error);
    return null;
  });

  if (!response) {
    callback(null);
    return;
  }

  callback(response);
}

export default function RestEndItem({
  staffId,
  rest,
  workStatus,
  callback,
}: RestStartItemProps) {
  const handleClick = () => {
    void restEnd({ staffId, rest, callback });
  };

  return (
    <Button
      color="rest"
      label="休憩終了"
      onClick={handleClick}
      variant="text"
      disabled={workStatus?.code !== WorkStatusCodes.RESTING}
    />
  );
}
