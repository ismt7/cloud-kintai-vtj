import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Attendance, Staff } from "../../../client";
import createAttendanceData from "../createAttendanceData";
import fetchAttendance from "../fetchAttendance";
import updateAttendanceData from "../updateAttendanceData";

function useAttendance(
  staff: Staff | null,
  targetWorkDate: string | undefined
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fromDate = dayjs(targetWorkDate);
  const toDate = fromDate;

  useEffect(() => {
    if (!staff || !targetWorkDate) return;

    setLoading(true);
    setError(null);

    void fetchAttendance(staff.id, fromDate, toDate)
      .then((value) => {
        setAttendance(value);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [staff, targetWorkDate]);

  const updateAttendance = async (newAttendance: Attendance | null) => {
    if (!newAttendance) throw new Error("Attendance is null");
    if (!staff) throw new Error("Staff is null");
    if (error) throw new Error("Error is not null");

    if (!attendance) {
      return createAttendanceData(staff.id, newAttendance)
        .then((value) => {
          setAttendance(value);
          return value;
        })
        .catch((e: Error) => {
          setError(e);
        });
    }

    return updateAttendanceData(staff.id, newAttendance)
      .then((value) => {
        setAttendance(value);
      })
      .catch((e: Error) => {
        setError(e);
      });
  };

  return { attendance, loading, error, updateAttendance };
}

export default useAttendance;
