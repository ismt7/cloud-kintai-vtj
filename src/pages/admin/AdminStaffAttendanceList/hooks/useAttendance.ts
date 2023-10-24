import { useEffect, useState } from "react";
import { Staff } from "../../../../client";
import fetchAttendanceList, {
  AttendanceOrigin,
} from "../../../../components/attendance_list/fetchAttendanceList";
import deleteAttendanceData from "../deleteAttendanceData";

export default function useAttendance(staff: Staff | null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [attendances, setAttendances] = useState<AttendanceOrigin[] | null>(
    null
  );

  useEffect(() => {
    if (!staff) {
      return;
    }

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

  const deleteAttendance = async (attendanceId: AttendanceOrigin["id"]) => {
    await deleteAttendanceData(attendanceId)
      .then(() => {
        setAttendances((prev) => {
          if (!prev) return prev;
          return prev.filter((attendance) => attendance.id !== attendanceId);
        });
      })
      .catch((e: Error) => {
        throw e;
      });
  };

  return {
    loading,
    error,
    attendances,
    deleteAttendance,
  };
}
