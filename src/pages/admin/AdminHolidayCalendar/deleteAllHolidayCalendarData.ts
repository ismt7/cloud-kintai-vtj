import { Service } from "../../../client";
import { LoginStaff } from "../../../components/staff_list/StaffList";

export default function deleteAllHolidayCalendarData(loginStaff: LoginStaff) {
  if (!loginStaff) {
    throw new Error("Failed to get loginStaff.");
  }

  return Service.deleteAllHolidayCalendar(loginStaff.id);
}
