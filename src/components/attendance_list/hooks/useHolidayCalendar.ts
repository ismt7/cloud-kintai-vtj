import { useEffect, useState } from "react";
import { HolidayCalendar, Service } from "../../../client";

const ADMIN_ID = 1;

export default function useHolidayCalendar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [holidayCalendars, setHolidayCalendars] = useState<HolidayCalendar[]>(
    []
  );

  useEffect(() => {
    setLoading(true);
    setError(null);
    Service.getHolidayCalendars(ADMIN_ID)
      .then((data) => {
        setHolidayCalendars(data);
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
    holidayCalendars,
  };
}
