import { useEffect, useState } from "react";
import { Staff } from "../../../client";
import fetchAttendanceList, { AttendanceOrigin } from "../fetchAttendanceList";

export default function useAttendance(staff: Staff) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [attendances, setAttendances] = useState<AttendanceOrigin[] | null>(
    null
  );

  useEffect(() => {
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

  return {
    loading,
    error,
    attendances,
  };
}
