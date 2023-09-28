import dayjs from "dayjs";
import { Attendance, Service, Staff } from "../../../client";
import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

interface GoDirectlyItemProps {
  staffId: Staff["id"] | undefined;
  attendance: Attendance | null;
  workStatus: WorkStatus | null;
  callback: (value: Attendance | null) => void;
}

async function goDirectly({
  staffId,
  attendance,
  callback,
}: {
  staffId: GoDirectlyItemProps["staffId"];
  attendance: GoDirectlyItemProps["attendance"];
  callback: (value: Attendance | null) => void;
}) {
  if (!staffId || !attendance) return;

  const now = dayjs().hour(9).minute(0).second(0);
  const { id: attendanceId } = attendance;
  const response = await Service.updateAttendance(
    attendanceId,
    {
      ...attendance,
      start_time: now.toISOString(),
      go_directly_flag: true,
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

export default function GoDirectlyItem({
  staffId,
  attendance,
  workStatus,
  callback,
}: GoDirectlyItemProps) {
  const handleClick = () => {
    void goDirectly({ staffId, attendance, callback });
  };

  return (
    <Button
      color="clock_in"
      label="直行"
      onClick={handleClick}
      variant="text"
      disabled={workStatus?.code !== WorkStatusCodes.BEFORE_WORK}
    />
  );
}
