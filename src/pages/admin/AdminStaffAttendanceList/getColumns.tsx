import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { NavigateFunction } from "react-router-dom";
import { HolidayCalendar } from "../../../client";
import { statusValueGetter } from "../../../components/attendance_list/Column";
import getDayOfWeek from "../../../components/attendance_list/getDayOfWeek";
import { AttendanceOrigin } from "../../../hooks/useAttendance/fetchAttendanceList";

export default function getColumns(
  deleteAttendance: (attendanceId: number) => Promise<void>,
  rowModelsModel: GridRowModesModel,
  staffId: string | undefined,
  navigate: NavigateFunction,
  holidayCalendars: HolidayCalendar[]
): GridColDef[] {
  return [
    {
      field: "status",
      headerName: "ステータス",
      align: "center",
      valueGetter: (params: GridValueGetterParams<AttendanceOrigin>) => {
        const { workDate, startTime, endTime } = params.row;
        return statusValueGetter(
          workDate,
          startTime,
          endTime,
          holidayCalendars
        );
      },
    },
    {
      field: "workDate",
      headerName: "勤務日",
      width: 90,
      valueGetter: (params: GridValueGetterParams<AttendanceOrigin>) => {
        const { workDate } = params.row;
        const date = dayjs(workDate);
        const isHoliday = holidayCalendars?.find(
          ({ holiday_date }) => holiday_date === workDate
        );
        const dayOfWeek = isHoliday ? "祝" : getDayOfWeek(workDate);
        return `${date.format("M/D")}(${dayOfWeek})`;
      },
    },
    {
      field: "startTime",
      headerName: "出勤時間",
      width: 70,
      valueGetter: (params: GridValueGetterParams<AttendanceOrigin>) => {
        const { startTime } = params.row;
        if (!startTime) return "";

        const date = dayjs(startTime);
        return date.format("HH:mm");
      },
    },
    {
      field: "endTime",
      headerName: "退勤時間",
      width: 70,
      valueGetter: (params: GridValueGetterParams<AttendanceOrigin>) => {
        const { endTime } = params.row;
        if (!endTime) return "";

        const date = dayjs(endTime);
        return date.format("HH:mm");
      },
    },
    {
      field: "restStartTime",
      headerName: "休憩開始(最近)",
      width: 110,
      valueGetter: (params: GridValueGetterParams<AttendanceOrigin>) => {
        const { rests } = params.row;
        if (rests.length === 0) return "";

        const rest = rests.reduce((a, b) => {
          const aDate = dayjs(a.created_at);
          const bDate = dayjs(b.created_at);
          return aDate.isAfter(bDate) ? a : b;
        });

        if (!rest.start_time) return "";

        const date = dayjs(rest.start_time);
        return date.format("HH:mm");
      },
    },
    {
      field: "restEndTime",
      headerName: "休憩終了(最近)",
      width: 110,
      valueGetter: (params: GridValueGetterParams<AttendanceOrigin>) => {
        const { rests } = params.row;
        if (rests.length === 0) return "";

        const rest = rests.reduce((a, b) => {
          const aDate = dayjs(a.created_at);
          const bDate = dayjs(b.created_at);
          return aDate.isAfter(bDate) ? a : b;
        });

        if (!rest.end_time) return "";

        const date = dayjs(rest.end_time);
        return date.format("HH:mm");
      },
    },
    {
      field: "createdAt",
      headerName: "作成日時",
      width: 100,
      valueGetter(params: GridValueGetterParams<AttendanceOrigin>) {
        const { createdAt } = params.row;
        if (!createdAt) return "";

        const date = dayjs(createdAt);
        return date.format("M/D HH:mm");
      },
    },
    {
      field: "updatedAt",
      headerName: "更新日時",
      width: 100,
      valueGetter(params: GridValueGetterParams<AttendanceOrigin>) {
        const { updatedAt } = params.row;
        if (!updatedAt) return "";

        const date = dayjs(updatedAt);
        return date.format("M/D HH:mm");
      },
    },
    {
      field: "summary",
      headerName: "摘要",
      align: "left",
      sortable: false,
      width: 300,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<AttendanceOrigin>) => {
        const { workDate } = params.row;
        const isHoliday = holidayCalendars?.find(
          ({ holiday_date }) => holiday_date === workDate
        );

        const summaryMessage = [];
        if (isHoliday) {
          summaryMessage.push(isHoliday.name);
        }

        if (params.row.remarks) {
          summaryMessage.push(params.row.remarks);
        }
        return summaryMessage.join(" ");
      },
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams<AttendanceOrigin>) => {
        const isEditMode =
          rowModelsModel[params.id]?.mode === GridRowModes.Edit;
        if (isEditMode) {
          return [
            <GridActionsCellItem
              key={params.row.id}
              icon={<SaveIcon />}
              label="保存"
            />,
            <GridActionsCellItem
              key={params.row.id}
              icon={<CloseIcon />}
              label="キャンセル"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={params.row.id}
            icon={<EditIcon />}
            label="編集"
            onClick={() => {
              if (!staffId) return;

              const workDate = dayjs(params.row.workDate).format("YYYYMMDD");
              navigate(`/admin/attendances/edit/${workDate}/${staffId}`);
            }}
          />,
          <GridActionsCellItem
            key={params.row.id}
            icon={<DeleteIcon />}
            onClick={() => {
              const confirm = window.confirm("本当に削除しますか？");
              if (!confirm) return;

              void deleteAttendance(params.row.id);
            }}
            label="削除"
          />,
        ];
      },
    },
  ];
}
