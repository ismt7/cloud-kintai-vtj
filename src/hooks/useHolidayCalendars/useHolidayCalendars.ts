import { useEffect, useState } from "react";

import {
  CreateHolidayCalendarInput,
  DeleteHolidayCalendarInput,
  HolidayCalendar,
  UpdateHolidayCalendarInput,
} from "../../API";
import createHolidayCalendarData from "./createHolidayCalendarData";
import deleteHolidayCalendarData from "./deleteHolidayCalendarData";
import fetchHolidayCalendars from "./fetchHolidayCalendars";
import updateHolidayCalendarData from "./updateHolidayCalendarData";

const LOCAL_STORAGE_KEY = "holidayCalendars";

export default function useHolidayCalendar() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [holidayCalendars, setHolidayCalendars] = useState<HolidayCalendar[]>(
    []
  );

  useEffect(() => {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      setHolidayCalendars(JSON.parse(cached));
    }
  }, []);

  const saveToLocalStorage = (data: HolidayCalendar[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const createHolidayCalendar = async (input: CreateHolidayCalendarInput) =>
    createHolidayCalendarData(input)
      .then((holidayCalendar) => {
        if (holidayCalendar) {
          const updated = [...holidayCalendars, holidayCalendar];
          setHolidayCalendars(updated);
          saveToLocalStorage(updated);
        }

        return holidayCalendar;
      })
      .catch(setError);

  const bulkCreateHolidayCalendar = async (
    inputs: CreateHolidayCalendarInput[]
  ) =>
    Promise.all(inputs.map((input) => createHolidayCalendarData(input)))
      .then((res) => {
        const updated = [...holidayCalendars, ...res];
        setHolidayCalendars(updated);
        saveToLocalStorage(updated);
        return res;
      })
      .catch((e) => {
        throw e;
      });

  const updateHolidayCalendar = async (input: UpdateHolidayCalendarInput) =>
    updateHolidayCalendarData(input)
      .then((res) => {
        setHolidayCalendars((holidayCalendars) => {
          const updated = holidayCalendars.map((holidayCalendar) =>
            holidayCalendar.id === res.id ? res : holidayCalendar
          );
          saveToLocalStorage(updated);
          return updated;
        });
        return res;
      })
      .catch((e) => {
        throw e;
      });

  const deleteHolidayCalendar = async (input: DeleteHolidayCalendarInput) => {
    deleteHolidayCalendarData(input)
      .then((res) => {
        const updated = holidayCalendars.filter((holidayCalendar) => {
          return holidayCalendar.id !== res.id;
        });
        setHolidayCalendars(updated);
        saveToLocalStorage(updated);
      })
      .catch((e) => {
        throw e;
      });
  };

  const fetchAllHolidayCalendars = async () => {
    try {
      setLoading(true);
      const allHolidayCalendars = await fetchHolidayCalendars();
      setHolidayCalendars(allHolidayCalendars);
      saveToLocalStorage(allHolidayCalendars);
      return allHolidayCalendars;
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    holidayCalendars,
    createHolidayCalendar,
    bulkCreateHolidayCalendar,
    updateHolidayCalendar,
    deleteHolidayCalendar,
    fetchAllHolidayCalendars,
  };
}
