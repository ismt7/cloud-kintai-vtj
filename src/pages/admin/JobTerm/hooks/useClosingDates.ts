import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AttendanceClosingDate, Service } from "../../../../client";

export default function useClosingDates() {
  const [closingDates, setClosingDates] = useState<AttendanceClosingDate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Service.getAttendanceClosingDates(1)
      .then((res) => {
        setClosingDates(res);
      })
      .catch((err: Error) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const createClosingDate = async (closingDate: dayjs.Dayjs) => {
    await Service.createAttendanceClosingDate(
      {
        closing_date: closingDate.format("YYYY-MM-DD"),
      },
      1
    )
      .then((res) => setClosingDates((prev) => [...prev, res]))
      .catch((err: Error) => {
        throw err;
      });
  };

  return { closingDates, loading, error, createClosingDate };
}
