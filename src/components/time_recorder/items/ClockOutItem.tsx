import dayjs from "dayjs";
import { Rest, Service, Staff } from "../../../client";
import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

interface ClockOutItemProps {
  staffId: Staff["id"] | undefined;
  rest: Rest | null;
  workStatus: WorkStatus | null;
  callback: (value: Rest | null) => void;
}

async function clockOut({
  staffId,
  rest,
  callback,
}: {
  staffId: ClockOutItemProps["staffId"];
  rest: ClockOutItemProps["rest"];
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

export default function ClockOutItem({
  staffId,
  rest,
  workStatus,
  callback,
}: ClockOutItemProps) {
  const handleClick = () => {
    void clockOut({ staffId, rest, callback });
  };

  return (
    <Button
      color="clock_out"
      label="勤務終了"
      onClick={handleClick}
      size="large"
      variant={
        workStatus?.code === WorkStatusCodes.WORKING ? "outlined" : "contained"
      }
      disabled={workStatus?.code !== WorkStatusCodes.WORKING}
    />
  );
}
