import dayjs from "dayjs";

import { Attendance, HolidayCalendar } from "@/API";

export class Holiday {
  constructor(
    private calendars: HolidayCalendar[],
    private workDate: Attendance["workDate"]
  ) {}

  getHoliday() {
    return this.calendars.find(({ holidayDate }) => {
      return this.convertDate(holidayDate) === this.workDate;
    });
  }

  isHoliday() {
    return !!this.getHoliday();
  }

  convertDate(value: string) {
    return dayjs(value).format("YYYY-MM-DD");
  }
}
