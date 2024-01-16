import {
  Box,
  Breadcrumbs,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridRowModesModel } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import getDayOfWeek, {
  DayOfWeek,
} from "../../../components/attendance_list/getDayOfWeek";
import useAttendances from "../../../hooks/useAttendances/useAttendances";
import useHolidayCalendars from "../../../hooks/useHolidayCalendars/useHolidayCalendars";
import { Staff } from "../../../hooks/useStaffs/common";
import useStaffs from "../../../hooks/useStaffs/useStaffs";
import getColumns from "./getColumns";
import { Attendance } from "../../../API";
import useCompanyHolidayCalendars from "../../../hooks/useCompanyHolidayCalendars/useCompanyHolidayCalendars";

export default function AdminStaffAttendanceList() {
  const { staffId } = useParams();
  const navigate = useNavigate();

  const { attendances, getAttendances } = useAttendances();
  const { staffs, loading: staffLoading, error: staffError } = useStaffs();
  const {
    companyHolidayCalendars,
    loading: companyHolidayCalendarLoading,
    error: companyHolidayCalendarError,
  } = useCompanyHolidayCalendars();

  const [staff, setStaff] = useState<Staff | undefined | null>(undefined);

  useEffect(() => {
    if (!staffId || staffLoading) return;

    const matchStaff = staffs.find((item) => item.sub === staffId);
    setStaff(matchStaff);
  }, [staffId, staffLoading]);

  useEffect(() => {
    if (!staffId) return;
    getAttendances(staffId).catch((error) => {
      console.log(error);
    });
  }, [staffId]);

  const {
    holidayCalendars,
    loading: holidayCalendarLoading,
    error: holidayCalendarError,
  } = useHolidayCalendars();

  const [rowModelsModel, setRowModelsModel] = useState<GridRowModesModel>({});

  if (staffLoading || holidayCalendarLoading || companyHolidayCalendarLoading) {
    return (
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        <LinearProgress />
      </Container>
    );
  }

  if (holidayCalendarError || companyHolidayCalendarError) {
    return (
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        <Typography>データ取得中に何らかの問題が発生しました</Typography>
      </Container>
    );
  }

  if (staff === null || staffError || !staffId) {
    return (
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        <Typography>データ取得中に何らかの問題が発生しました</Typography>
      </Container>
    );
  }

  const deleteAttendance = async (attendanceId: number) => {
    console.log(attendanceId);
  };

  return (
    <Container maxWidth="xl">
      <Stack spacing={1} sx={{ pt: 1 }}>
        <Box>
          <Breadcrumbs>
            <Link to="/" color="inherit">
              TOP
            </Link>
            <Link to="/admin/attendances" color="inherit">
              勤怠管理
            </Link>
            <Typography color="text.primary">勤怠一覧</Typography>
          </Breadcrumbs>
        </Box>
        <Typography variant="h4">
          {staff?.familyName || "(不明)"} さんの勤怠
        </Typography>
        <Box sx={{ pb: 5 }}>
          <DataGrid
            rows={attendances}
            columns={getColumns(
              deleteAttendance,
              rowModelsModel,
              staffId,
              navigate,
              holidayCalendars,
              companyHolidayCalendars
            )}
            getRowId={(row) => row.workDate}
            rowModesModel={rowModelsModel}
            onRowModesModelChange={(model) => setRowModelsModel(model)}
            autoHeight
            hideFooter={true}
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
        </Box>
      </Stack>
    </Container>
  );
}
