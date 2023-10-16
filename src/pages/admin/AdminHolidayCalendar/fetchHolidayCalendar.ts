import { HolidayCalendar, Service } from "../../../client";
import { LoginStaff } from "../../../components/staff_list/StaffList";

function fetchHolidayCalendar(
  loginStaff: LoginStaff
): Promise<HolidayCalendar[]> {
  if (!loginStaff) {
    throw new Error("Failed to get loginStaff.");
  }

  return Service.getHolidayCalendars(loginStaff.id);
}

export default fetchHolidayCalendar;
