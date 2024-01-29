import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Attendance } from "../../API";
import fetchAttendance from "../common/fetchAttendance";
import fetchCognitoUsers from "../common/fetchCognitoUsers";

export interface AttendanceDaily {
  sub: string;
  givenName: string;
  familyName: string;
  attendance: Attendance | null;
}

export default function useAttendanceDaily() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [attendanceDailyList, setAttendanceDailyList] = useState<
    AttendanceDaily[]
  >([]);

  const now = dayjs();
  const workDate = now.format("YYYY-MM-DD");

  useEffect(() => {
    setLoading(true);
    setError(null);
    void fetchCognitoUsers()
      .then(async (res) => {
        setAttendanceDailyList(
          await Promise.all(
            res.map(async ({ sub, givenName, familyName }) => {
              const attendance = await fetchAttendance(sub, workDate);
              return {
                sub,
                givenName,
                familyName,
                attendance,
              };
            })
          )
        );
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    error,
    attendanceDailyList,
  };
}
