import { useEffect, useState } from "react";
import {
  CreateHolidayCalendarInput,
  HolidayCalendar,
  UpdateHolidayCalendarInput,
} from "../../API";
import createHolidayCalendarData from "./createHolidayCalendarData";
import fetchHolidayCalendars from "./fetchHolidayCalendars";
import updateHolidayCalendarData from "./updateHolidayCalendarData";

export default function useHolidayCalendar() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [holidayCalendars, setHolidayCalendars] = useState<HolidayCalendar[]>(
    []
  );

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchHolidayCalendars()
      .then(setHolidayCalendars)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const createHolidayCalendar = async (input: CreateHolidayCalendarInput) =>
    createHolidayCalendarData(input)
      .then((holidayCalendar) => {
        if (holidayCalendar) {
          setHolidayCalendars([...holidayCalendars, holidayCalendar]);
        }

        return holidayCalendar;
      })
      .catch(setError);

  const bulkCreateHolidayCalendar = async (
    inputs: CreateHolidayCalendarInput[]
  ) =>
    Promise.all(inputs.map((input) => createHolidayCalendarData(input)))
      .then((res) => {
        setHolidayCalendars([...holidayCalendars, ...res]);
        return res;
      })
      .catch((e) => {
        throw e;
      });

  const updateHolidayCalendar = async (input: UpdateHolidayCalendarInput) =>
    updateHolidayCalendarData(input)
      .then((res) => {
        setHolidayCalendars([...holidayCalendars, res]);
        return res;
      })
      .catch((e) => {
        throw e;
      });

  return {
    loading,
    error,
    holidayCalendars,
    createHolidayCalendar,
    bulkCreateHolidayCalendar,
    updateHolidayCalendar,
  };
}
