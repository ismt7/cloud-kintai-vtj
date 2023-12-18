import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Logger } from "aws-amplify";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useAppDispatchV2 } from "../../app/hooks";
import { Attendance } from "../../client";
import { E02001 } from "../../errors";
import useAttendances from "../../hooks/useAttendances/useAttendances";
import useCognitoUser from "../../hooks/useCognitoUser";
import useHolidayCalendars from "../../hooks/useHolidayCalendars/useHolidayCalendars";
import { setSnackbarError } from "../../lib/reducers/snackbarReducer";
import Title from "../Title/Title";
import GetColumns from "./Column";
import getDayOfWeek, { DayOfWeek } from "./getDayOfWeek";

export default function AttendanceTable() {
  const dispatch = useAppDispatchV2();
  const { cognitoUser, loading: cognitoUserLoading } = useCognitoUser();
  const { attendances, getAttendances } = useAttendances();
  const {
    holidayCalendars,
    loading: holidayCalendarLoading,
    error: holidayCalendarError,
  } = useHolidayCalendars();

  const logger = new Logger(
    "AttendanceList",
    process.env.NODE_ENV === "development" ? "DEBUG" : "ERROR"
  );

  useEffect(() => {
    if (!cognitoUser) return;

    getAttendances(cognitoUser.id).catch((error) => {
      logger.debug(error);
      dispatch(setSnackbarError(E02001));
    });
  }, [cognitoUser]);

  if (holidayCalendarLoading || cognitoUserLoading) {
    return <LinearProgress />;
  }

  if (holidayCalendarError) {
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
          rows={attendances ?? []}
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
                holidayCalendar.holidayDate === params.row.workDate
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
