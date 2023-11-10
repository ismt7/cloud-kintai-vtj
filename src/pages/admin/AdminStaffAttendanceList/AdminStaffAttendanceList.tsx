import {
  Box,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridRowModesModel } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Attendance } from "../../../client";
import getDayOfWeek, {
  DayOfWeek,
} from "../../../components/attendance_list/getDayOfWeek";
import useHolidayCalendar from "../../../components/attendance_list/hooks/useHolidayCalendar";
import useAttendance from "../../../hooks/useAttendance/useAttendance";
import getColumns from "./getColumns";
import useStaff from "./hooks/useStaff";

export default function AdminStaffAttendanceList() {
  const { staffId } = useParams();
  const navigate = useNavigate();

  const { staff, loading: staffLoading } = useStaff(
    staffId ? Number(staffId) : undefined
  );
  const {
    attendances,
    loading: attendanceLoading,
    deleteAttendance,
  } = useAttendance(staff);
  const { holidayCalendars, loading: holidayCalendarLoading } =
    useHolidayCalendar();

  const [rowModelsModel, setRowModelsModel] = useState<GridRowModesModel>({});

  if (staffLoading || attendanceLoading || holidayCalendarLoading) {
    return (
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        <LinearProgress />
      </Container>
    );
  }

  if (!staff) {
    return (
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        <Typography>データ取得中に何らかの問題が発生しました</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Stack spacing={1}>
        <Typography variant="h4">{staff.last_name} さんの勤怠</Typography>
        <Box sx={{ px: 3, pb: 5 }}>
          <DataGrid
            rows={attendances || []}
            columns={getColumns(
              deleteAttendance,
              rowModelsModel,
              staffId,
              navigate,
              holidayCalendars
            )}
            getRowId={(row) => row.workDate}
            rowModesModel={rowModelsModel}
            onRowModesModelChange={(model) => setRowModelsModel(model)}
            autoHeight
            hideFooter={true}
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
    </Container>
  );
}
