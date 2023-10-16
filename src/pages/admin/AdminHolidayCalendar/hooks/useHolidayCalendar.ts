import { useEffect, useState } from "react";
import { HolidayCalendar } from "../../../../client";
import { LoginStaff } from "../../../../components/staff_list/StaffList";
import createHolidayCalendarData from "../createHolidayCalendarData";
import deleteAllHolidayCalendarData from "../deleteAllHolidayCalendarData";
import fetchHolidayCalendar from "../fetchHolidayCalendar";

function useHolidayCalendars(loginStaff: LoginStaff) {
  const [loading, setLoading] = useState<boolean>(false);
  const [holidayCalendars, setHolidayCalendars] = useState<HolidayCalendar[]>(
    []
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!loginStaff) return;

    setLoading(true);
    setError(null);

    fetchHolidayCalendar(loginStaff)
      .then((response) => {
        setHolidayCalendars(response);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loginStaff]);

  const createHolidayCalendars = async (
    newHolidayCalendars: HolidayCalendar[]
  ) => {
    if (!loginStaff) {
      throw new Error("Failed to get loginStaff.");
    }

    setLoading(true);
    setError(null);

    deleteAllHolidayCalendarData(loginStaff).catch((e: Error) => {
      throw e;
    });

    await Promise.all(
      newHolidayCalendars.map((newHolidayCalendar) =>
        createHolidayCalendarData(loginStaff, newHolidayCalendar)
      )
    )
      .then(() => {
        setLoading(false);
        setHolidayCalendars(newHolidayCalendars);
      })
      .catch((e: Error) => {
        setLoading(false);
        setError(e);
      });
  };

  return { holidayCalendars, loading, error, createHolidayCalendars };
}

export default useHolidayCalendars;
