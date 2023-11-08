import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { NavigateFunction } from "react-router-dom";
import { AttendanceOrigin } from "../../../components/attendance_list/fetchAttendanceList";

export default function getColumns(
  deleteAttendance: (attendanceId: number) => Promise<void>,
  rowModelsModel: GridRowModesModel,
  staffId: string | undefined,
  navigate: NavigateFunction
) {
  return [
    {
      field: "workDate",
      headerName: "勤務日",
      width: 120,
      valueGetter: (params: GridValueGetterParams<AttendanceOrigin>) => {
        const date = dayjs(params.row.workDate);
        return date.format("YYYY/MM/DD");
      },
    },
    {
      field: "startTime",
      headerName: "出勤時間",
      width: 100,
      valueGetter: (params: GridValueGetterParams<AttendanceOrigin>) => {
        if (!params.row.startTime) return "";

        const date = dayjs(params.row.startTime);
        return date.format("HH:mm");
      },
    },
    {
      field: "endTime",
      headerName: "退勤時間",
      width: 100,
      valueGetter: (params: GridValueGetterParams<AttendanceOrigin>) => {
        if (!params.row.endTime) return "";

        const date = dayjs(params.row.endTime);
        return date.format("HH:mm");
      },
    },
    {
      field: "restStartTime",
      headerName: "休憩開始(最近)",
      width: 150,
      valueGetter: (params: GridValueGetterParams<AttendanceOrigin>) => {
        if (params.row.rests.length === 0) return "";

        const rest = params.row.rests.reduce((a, b) => {
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
      width: 150,
      valueGetter: (params: GridValueGetterParams<AttendanceOrigin>) => {
        if (params.row.rests.length === 0) return "";

        const rest = params.row.rests.reduce((a, b) => {
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
      width: 180,
      valueGetter(params: GridValueGetterParams<AttendanceOrigin>) {
        const date = dayjs(params.row.createdAt);
        return date.format("YYYY/MM/DD HH:mm");
      },
    },
    {
      field: "updatedAt",
      headerName: "更新日時",
      width: 180,
      valueGetter(params: GridValueGetterParams<AttendanceOrigin>) {
        const date = dayjs(params.row.updatedAt);
        return date.format("YYYY/MM/DD HH:mm");
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
