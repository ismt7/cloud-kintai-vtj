import { CompanyHolidayCalendar, Service } from "../../../client";
import { LoginStaff } from "../../../components/staff_list/StaffList";

export default function fetchCompanyHolidayCalendars(
  loginStaff: LoginStaff
): Promise<CompanyHolidayCalendar[]> {
  if (!loginStaff) {
    throw new Error("Failed to get loginStaff.");
  }

  return Service.getCompanyHolidayCalendars(loginStaff.id);
}
