import { useEffect, useState } from "react";
import {
  CompanyHolidayCalendar,
  CompanyHolidayCalendarCreate,
} from "../../../client";
import { LoginStaff } from "../../../components/staff_list/StaffList";
import createCompanyHolidayCalendarData from "./createCompanyHolidayCalendar";
import deleteAllCompanyHolidayCalendarData from "./deleteAllCompanyHolidayCalendar";
import fetchCompanyHolidayCalendar from "./fetchCompanyHolidayCalendar";

export default function useCompanyHolidayCalendars(loginStaff: LoginStaff) {
  const [companyHolidayCalendars, setCompanyHolidayCalendars] = useState<
    CompanyHolidayCalendar[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!loginStaff) return;

    setLoading(true);
    setError(null);
    fetchCompanyHolidayCalendar(loginStaff)
      .then((response) => {
        setCompanyHolidayCalendars(response);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const createCompanyHolidayCalendars = async (
    newCompanyHolidayCalendars: CompanyHolidayCalendarCreate[]
  ) => {
    if (!loginStaff) {
      throw new Error("Failed to get loginStaff.");
    }

    setLoading(true);
    setError(null);

    deleteAllCompanyHolidayCalendarData(loginStaff).catch((e: Error) => {
      throw e;
    });

    await Promise.all(
      newCompanyHolidayCalendars.map((newCompanyHolidayCalendar) =>
        createCompanyHolidayCalendarData(loginStaff, newCompanyHolidayCalendar)
      )
    )
      .then((response) => {
        setCompanyHolidayCalendars(response);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    companyHolidayCalendars,
    loading,
    error,
    createCompanyHolidayCalendars,
  };
}
