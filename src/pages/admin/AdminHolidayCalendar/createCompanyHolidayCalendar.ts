import { CompanyHolidayCalendarCreate, Service } from "../../../client";
import { LoginStaff } from "../../../components/staff_list/StaffList";

export default function createCompanyHolidayCalendarData(
  loginStaff: LoginStaff,
  companyHolidayCalendar: CompanyHolidayCalendarCreate
) {
  if (!loginStaff) {
    throw new Error("Failed to get loginStaff.");
  }

  return Service.createCompanyHolidayCalendar(
    companyHolidayCalendar,
    loginStaff.id
  );
}
