import { HolidayCalendarCreate, Service } from "../../../client";
import { LoginStaff } from "../../../components/staff_list/StaffList";

function createHolidayCalendarData(
  loginStaff: LoginStaff,
  holidayCalendar: HolidayCalendarCreate
) {
  if (!loginStaff) {
    throw new Error("Failed to get loginStaff.");
  }

  return Service.createHolidayCalendar(holidayCalendar, loginStaff.id);
}

export default createHolidayCalendarData;
