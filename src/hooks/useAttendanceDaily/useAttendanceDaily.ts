import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { Attendance } from "../../API";
import fetchAttendance from "../common/fetchAttendance";
import useStaffs from "../useStaffs/useStaffs";

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

  const { staffs, loading: staffLoading, error: staffError } = useStaffs();

  const now = dayjs();
  const workDate = now.format("YYYY-MM-DD");

  useEffect(() => {
    if (staffLoading || staffError) return;
    if (staffs.length === 0) return;

    setLoading(true);
    setError(null);
    Promise.all(
      staffs.map(async ({ cognitoUserId, givenName, familyName }) => {
        const attendance = await fetchAttendance(cognitoUserId, workDate);

        return {
          sub: cognitoUserId,
          givenName,
          familyName,
          attendance,
        } as AttendanceDaily;
      })
    )
      .then((res) => {
        setAttendanceDailyList(res);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [staffs, staffLoading, staffError, workDate]);

  return {
    loading,
    error,
    attendanceDailyList,
  };
}
