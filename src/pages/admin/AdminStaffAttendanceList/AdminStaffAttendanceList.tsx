import {
  Alert,
  AlertTitle,
  Badge,
  Box,
  Breadcrumbs,
  Container,
  IconButton,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { GridRowModesModel } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAppDispatchV2 } from "../../../app/hooks";
import * as MESSAGE_CODE from "../../../errors";
import useAttendances from "../../../hooks/useAttendances/useAttendances";
import useCompanyHolidayCalendars from "../../../hooks/useCompanyHolidayCalendars/useCompanyHolidayCalendars";
import useHolidayCalendars from "../../../hooks/useHolidayCalendars/useHolidayCalendars";
import useStaffs, { StaffType } from "../../../hooks/useStaffs/useStaffs";
import { setSnackbarError } from "../../../lib/reducers/snackbarReducer";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { WorkDateTableCell } from "./WorkDateTableCell";
import { StartTimeTableCell } from "./StartTimeTableCell";
import { EndTimeTableCell } from "./EndTimeTableCell";
import { RestStartTimeTableCell } from "./RestStartTimeTableCell";
import { RestEndTimeTableCell } from "./RestEndTimeTableCell";
import { CreatedAtTableCell } from "./CreatedAtTableCell";
import { UpdatedAtTableCell } from "./UpdatedAtTableCell";
import { SummaryTableCell } from "./SummaryTableCell";
import "./styles.scss";
import getDayOfWeek, {
  DayOfWeek,
} from "../../../components/AttendanceList/getDayOfWeek";
import { Attendance } from "../../../API";

export default function AdminStaffAttendanceList() {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatchV2();

  const { attendances, getAttendances } = useAttendances();
  const { staffs, loading: staffLoading, error: staffError } = useStaffs();
  const {
    companyHolidayCalendars,
    loading: companyHolidayCalendarLoading,
    error: companyHolidayCalendarError,
  } = useCompanyHolidayCalendars();

  const [staff, setStaff] = useState<StaffType | undefined | null>(undefined);

  useEffect(() => {
    if (!staffId || staffLoading) return;

    const matchStaff = staffs.find((item) => item.cognitoUserId === staffId);
    setStaff(matchStaff);
  }, [staffId, staffLoading]);

  useEffect(() => {
    if (!staffId) return;
    getAttendances(staffId).catch(() =>
      dispatch(setSnackbarError(MESSAGE_CODE.E02001))
    );
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

  const handleEdit = (workDate: string) => {
    navigate(`/admin/attendances/edit/${workDate}/${staffId}`);
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
        <ApprovalPendingMessage attendances={attendances} />
        <Box sx={{ pb: 5 }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 100, minWidth: 100 }} />
                  <TableCell>勤務日</TableCell>
                  <TableCell>出勤時間</TableCell>
                  <TableCell>退勤時間</TableCell>
                  <TableCell>休憩開始(最近)</TableCell>
                  <TableCell>休憩終了(最近)</TableCell>
                  <TableCell>作成日時</TableCell>
                  <TableCell>更新日時</TableCell>
                  <TableCell>摘要</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendances.map((attendance, index) => (
                  <TableRow
                    key={index}
                    className={(() => {
                      const { workDate } = attendance;
                      const today = dayjs().format("YYYY-MM-DD");
                      if (workDate === today) {
                        return "table-row--today";
                      }

                      const isHoliday = holidayCalendars?.find(
                        (holidayCalendar) =>
                          holidayCalendar.holidayDate === workDate
                      );

                      const isCompanyHoliday = companyHolidayCalendars?.find(
                        (companyHolidayCalendar) =>
                          companyHolidayCalendar.holidayDate === workDate
                      );

                      if (isHoliday || isCompanyHoliday) {
                        return "table-row--sunday";
                      }

                      const dayOfWeek = getDayOfWeek(workDate);
                      switch (dayOfWeek) {
                        case DayOfWeek.Sat:
                          return "table-row--saturday";
                        case DayOfWeek.Sun:
                          return "table-row--sunday";
                        default:
                          return "table-row--default";
                      }
                    })()}
                  >
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleEdit(
                            dayjs(attendance.workDate).format("YYYYMMDD")
                          )
                        }
                      >
                        <Badge
                          badgeContent={(() => {
                            const { changeRequests } = attendance;
                            if (!changeRequests) return 0;

                            // 未承認の変更申請の数をカウント
                            const count = changeRequests
                              .filter(
                                (item): item is NonNullable<typeof item> =>
                                  item !== null
                              )
                              .filter(
                                (changeRequest) => !changeRequest.completed
                              ).length;

                            return count;
                          })()}
                          color="primary"
                        >
                          <EditIcon />
                        </Badge>
                      </IconButton>
                    </TableCell>

                    {/* 勤務日 */}
                    <WorkDateTableCell
                      workDate={attendance.workDate}
                      holidayCalendars={holidayCalendars}
                    />

                    {/* 出勤時間 */}
                    <StartTimeTableCell
                      startTime={attendance.startTime}
                      paidHolidayFlag={attendance.paidHolidayFlag}
                    />

                    {/* 退勤時間 */}
                    <EndTimeTableCell
                      endTime={attendance.endTime}
                      paidHolidayFlag={attendance.paidHolidayFlag}
                    />

                    {/* 休憩開始(最近) */}
                    <RestStartTimeTableCell
                      rests={attendance.rests}
                      paidHolidayFlag={attendance.paidHolidayFlag}
                    />

                    {/* 休憩終了(最近) */}
                    <RestEndTimeTableCell
                      rests={attendance.rests}
                      paidHolidayFlag={attendance.paidHolidayFlag}
                    />

                    {/* 作成日時 */}
                    <CreatedAtTableCell createdAt={attendance.createdAt} />

                    {/* 更新日時 */}
                    <UpdatedAtTableCell updatedAt={attendance.updatedAt} />

                    {/* 摘要 */}
                    <SummaryTableCell
                      workDate={attendance.workDate}
                      paidHolidayFlag={attendance.paidHolidayFlag}
                      remarks={attendance.remarks}
                      holidayCalendars={holidayCalendars}
                      companyHolidayCalendars={companyHolidayCalendars}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Container>
  );
}

function ApprovalPendingMessage({
  attendances,
}: {
  attendances: Attendance[];
}) {
  const hasApprovalPending = attendances.some((attendance) =>
    attendance.changeRequests?.some((item) => !item?.completed)
  );

  if (!hasApprovalPending) return null;

  return (
    <Alert severity="warning">
      <AlertTitle sx={{ fontWeight: "bold" }}>確認してください</AlertTitle>
      未承認の変更リクエストがあります
    </Alert>
  );
}
