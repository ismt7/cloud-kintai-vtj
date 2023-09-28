import dayjs from "dayjs";
import { Attendance, Service, Staff } from "../../../client";
import Button from "../../button/Button";
import { WorkStatus, WorkStatusCodes } from "../WorkStatusCodes";

interface ClockInItemProps {
  staffId: Staff["id"] | undefined;
  workStatus: WorkStatus | null;
  attendance: Attendance | null;
  callback: (value: Attendance | null) => void;
}

async function clockIn({
  staffId,
  attendance,
  callback,
}: {
  staffId: ClockInItemProps["staffId"];
  attendance: ClockInItemProps["attendance"];
  callback: (value: Attendance | null) => void;
}) {
  if (!staffId || !attendance) return;

  const now = dayjs();
  const { id: attendanceId } = attendance;
  const response = await Service.updateAttendance(
    attendanceId,
    {
      ...attendance,
      start_time: now.toISOString(),
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

export default function ClockInItem({
  staffId,
  attendance,
  workStatus,
  callback,
}: ClockInItemProps) {
  const handleClick = () => {
    void clockIn({ staffId, attendance, callback });
  };

  return (
    <Button
      color="clock_in"
      label="勤務開始"
      onClick={handleClick}
      size="large"
      variant={
        workStatus?.code === WorkStatusCodes.BEFORE_WORK
          ? "outlined"
          : "contained"
      }
      disabled={workStatus?.code !== WorkStatusCodes.BEFORE_WORK}
    />
  );
}
