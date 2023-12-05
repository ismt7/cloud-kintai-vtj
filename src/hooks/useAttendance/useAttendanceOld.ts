import { useEffect, useState } from "react";
import { Service } from "../../client";
import { LoginStaff } from "../../components/staff_list/StaffList";
import { AttendanceOrigin, fetchAttendanceList } from "./fetchAttendanceList";

const ADMIN_USER_ID = 1;

export default function useAttendanceOld(staff: LoginStaff) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [attendances, setAttendances] = useState<AttendanceOrigin[] | null>(
    null
  );

  useEffect(() => {
    if (!staff) return;

    setLoading(true);
    setError(null);
    fetchAttendanceList(staff)
      .then((data) => {
        setAttendances(data);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [staff]);

  const deleteAttendance = async (attendanceId: number) =>
    Service.deleteAttendance(attendanceId, ADMIN_USER_ID)
      .then(() => {
        setAttendances((prev) => {
          if (!prev) return prev;
          return prev.filter((attendance) => attendance.id !== attendanceId);
        });
      })
      .catch((e: Error) => {
        throw e;
      });

  return {
    loading,
    error,
    attendances,
    deleteAttendance,
  };
}
