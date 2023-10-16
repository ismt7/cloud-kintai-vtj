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
  const [updating, setUpdating] = useState<boolean>(false);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fromDate = dayjs(targetWorkDate);
  const toDate = fromDate;

  useEffect(() => {
    if (!staff || !targetWorkDate) return;

    setLoading(true);
    void fetchAttendance(staff.id, fromDate, toDate)
      .then((value) => {
        setAttendance(value);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e);
        setLoading(false);
      });
  }, [staff, targetWorkDate]);

  const updateAttendance = (newAttendance: Attendance | null) => {
    if (!newAttendance) throw new Error("Attendance is null");
    if (!staff) throw new Error("Staff is null");
    if (error) throw new Error("Error is not null");

    setUpdating(true);
    if (!attendance) {
      void createAttendanceData(staff.id, newAttendance)
        .then((value) => {
          setAttendance(value);
          setUpdating(false);
        })
        .catch((e: Error) => {
          setError(e);
          setUpdating(false);
        });
      return;
    }

    void updateAttendanceData(staff.id, newAttendance)
      .then((value) => {
        setAttendance(value);
        setUpdating(false);
      })
      .catch((e: Error) => {
        setError(e);
        setUpdating(false);
      });
  };

  return { attendance, loading, updating, error, updateAttendance };
}

export default useAttendance;
