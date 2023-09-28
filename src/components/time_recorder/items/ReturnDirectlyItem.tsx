import dayjs from "dayjs";
import { Attendance, Service, Staff } from "../../../client";
import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

interface ReturnDirectlyItemProps {
  staffId: Staff["id"] | undefined;
  attendance: Attendance | null;
  workStatus: WorkStatus | null;
  callback: (value: Attendance | null) => void;
}

async function returnDirectly({
  staffId,
  attendance,
  callback,
}: {
  staffId: ReturnDirectlyItemProps["staffId"];
  attendance: ReturnDirectlyItemProps["attendance"];
  callback: (value: Attendance | null) => void;
}) {
  if (!staffId || !attendance) return;

  const now = dayjs().hour(18).minute(0).second(0);
  const { id: attendanceId } = attendance;
  const response = await Service.updateAttendance(
    attendanceId,
    {
      ...attendance,
      end_time: now.toISOString(),
      return_directly_flag: true,
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

export default function ReturnDirectly({
  staffId,
  attendance,
  workStatus,
  callback,
}: ReturnDirectlyItemProps) {
  const handleClick = () => {
    void returnDirectly({ staffId, attendance, callback });
  };

  return (
    <Button
      color="clock_out"
      label="直帰"
      onClick={handleClick}
      variant="text"
      disabled={workStatus?.code !== WorkStatusCodes.WORKING}
    />
  );
}
