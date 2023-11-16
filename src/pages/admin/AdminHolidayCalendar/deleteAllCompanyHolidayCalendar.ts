import { Service } from "../../../client";
import { LoginStaff } from "../../../components/staff_list/StaffList";

export default function deleteAllCompanyHolidayCalendarData(
  loginStaff: LoginStaff
) {
  if (!loginStaff) {
    throw new Error("Failed to get loginStaff.");
  }

  return Service.deleteAllCompanyHolidayCalendar(loginStaff.id);
}
