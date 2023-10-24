import { useEffect, useState } from "react";
import { Attendance } from "../../../client";
import { LoginStaff } from "../../staff_list/StaffList";
import fetchAttendance from "../fetchAttendance";

export default function useAttendance(loginStaff: LoginStaff) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [attendance, setAttendance] = useState<Attendance | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (!loginStaff) {
      setLoading(false);
      return;
    }

    fetchAttendance(loginStaff)
      .then((data) => {
        setAttendance(data);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loginStaff]);

  return {
    loading,
    error,
    attendance,
  };
}
