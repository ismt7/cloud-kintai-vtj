import { Box, styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { NavigateFunction } from "react-router-dom";

import {
  Attendance,
  CompanyHolidayCalendar,
  HolidayCalendar,
  Staff,
} from "../../API";
import GetColumns from "./Column";
import getDayOfWeek, { DayOfWeek } from "./getDayOfWeek";

const DesktopBox = styled(Box)(({ theme }) => ({
  padding: "0px 40px 40px 40px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export default function DesktopList({
  attendances,
  holidayCalendars,
  companyHolidayCalendars,
  navigate,
  staff,
}: {
  attendances: Attendance[];
  holidayCalendars: HolidayCalendar[];
  companyHolidayCalendars: CompanyHolidayCalendar[];
  navigate: NavigateFunction;
  staff: Staff | null | undefined;
}) {
  return (
    <DesktopBox>
      <DataGrid
        rows={attendances ?? []}
        columns={GetColumns(
          holidayCalendars,
          companyHolidayCalendars,
          navigate,
          staff
        )}
        autoHeight
        hideFooter={true}
        getRowId={(row) => row.workDate}
        getRowClassName={(params: {
          row: { workDate: Attendance["workDate"] };
        }) => {
          const today = dayjs().format("YYYY-MM-DD");
          if (params.row.workDate === today) {
            return "super-app-theme--today";
          }

          const isHoliday = holidayCalendars?.find(
            (holidayCalendar) =>
              holidayCalendar.holidayDate === params.row.workDate
          );

          const isCompanyHoliday = companyHolidayCalendars?.find(
            (companyHolidayCalendar) =>
              companyHolidayCalendar.holidayDate === params.row.workDate
          );

          if (isHoliday || isCompanyHoliday) {
            return "super-app-theme--sunday";
          }

          const dayOfWeek = getDayOfWeek(params.row.workDate);
          switch (dayOfWeek) {
            case DayOfWeek.Sat:
              return "super-app-theme--saturday";
            case DayOfWeek.Sun:
              return "super-app-theme--sunday";
            default:
              return "super-app-theme--default";
          }
        }}
        sx={{
          "& .super-app-theme--saturday": {
            backgroundColor: "#93FFFF",
          },
          "& .super-app-theme--sunday": {
            backgroundColor: "#FF9393",
          },
          "& .super-app-theme--today": {
            backgroundColor: "#FFFF93",
            fontWeight: "bold",
          },
        }}
      />
    </DesktopBox>
  );
}
