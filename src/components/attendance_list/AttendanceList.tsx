import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Attendance } from "../../client";
import useAttendanceOld from "../../hooks/useAttendance/useAttendanceOld";
import useLoginStaff from "../attendance_editor/hooks/useLoginStaff";
import Title from "../Title/Title";
import GetColumns from "./Column";
import getDayOfWeek, { DayOfWeek } from "./getDayOfWeek";
import useHolidayCalendar from "./hooks/useHolidayCalendar";

export default function AttendanceTable() {
  const { user } = useAuthenticator();
  const {
    loginStaff,
    loading: loginStaffLoading,
    error: loginStaffError,
  } = useLoginStaff(user?.attributes?.sub);
  const {
    attendances: attendancesOld,
    loading: attendanceOldLoading,
    error: attendanceOldError,
  } = useAttendanceOld(loginStaff);
  const { holidayCalendars, loading: holidayCalendarLoading } =
    useHolidayCalendar();

  if (loginStaffLoading || attendanceOldLoading || holidayCalendarLoading) {
    return <LinearProgress />;
  }

  if (loginStaffError || attendanceOldError) {
    return <div>データ取得中に何らかの問題が発生しました</div>;
  }

  return (
    <Stack spacing={2}>
      <Box>
        <Title text="勤怠一覧" />
      </Box>
      <Box sx={{ px: 5 }}>
        <Typography variant="body1">
          今日から30日前までの勤怠情報を表示しています
        </Typography>
      </Box>
      <Box sx={{ px: 5, pb: 5 }}>
        <DataGrid
          rows={attendancesOld ?? []}
          columns={GetColumns(holidayCalendars)}
          autoHeight
          hideFooter={true}
          getRowId={(row) => row.workDate}
          getRowClassName={(params: {
            row: { workDate: Attendance["work_date"] };
          }) => {
            const today = dayjs().format("YYYY-MM-DD");
            if (params.row.workDate === today) {
              return "super-app-theme--today";
            }

            const isHoliday = holidayCalendars?.find(
              (holidayCalendar) =>
                holidayCalendar.holiday_date === params.row.workDate
            );

            if (isHoliday) {
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
      </Box>
    </Stack>
  );
}
