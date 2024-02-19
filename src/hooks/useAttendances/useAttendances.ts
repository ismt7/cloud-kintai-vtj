import { useState } from "react";

import { Attendance } from "../../API";
import fetchAttendances from "./fetchAttendances";

export default function useAttendances() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);

  const getAttendances = async (staffId: string) =>
    fetchAttendances(staffId)
      .then((res) => {
        setAttendances(res);
        return res;
      })
      .catch((e: Error) => {
        throw e;
      });

  return {
    attendances,
    getAttendances,
  };
}
