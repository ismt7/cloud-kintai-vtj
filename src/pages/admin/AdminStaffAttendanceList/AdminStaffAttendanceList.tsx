import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AttendanceOrigin } from "../../../components/attendance_list/fetchAttendanceList";
import useAttendance from "./hooks/useAttendance";
import useStaff from "./hooks/useStaff";

export default function AdminStaffAttendanceList() {
  const { staffId } = useParams();
  const { staff, loading: staffLoading } = useStaff(
    staffId ? Number(staffId) : undefined
  );
  const {
    attendances,
    loading: attendanceLoading,
    deleteAttendance,
  } = useAttendance(staff);

  const [rowModelsModel, setRowModelsModel] = useState<GridRowModesModel>({});

  if (staffLoading || attendanceLoading) {
    return (
      <Container maxWidth="xl">
        <CircularProgress />
      </Container>
    );
  }

  if (!staff) {
    return (
      <Container maxWidth="xl">
        <Typography>データ取得中に何らかの問題が発生しました</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Stack>
        <h1>{staff.last_name} さんの勤怠</h1>
        <Box>
          <DataGrid
            rows={attendances || []}
            rowModesModel={rowModelsModel}
            onRowModesModelChange={(model) => setRowModelsModel(model)}
            columns={[
              {
                field: "workDate",
                headerName: "勤務日",
                width: 120,
                valueGetter: (params) => {
                  const date = dayjs(params.row.workDate);
                  return date.format("YYYY/MM/DD");
                },
              },
              { field: "startTime", headerName: "出勤時間", width: 120 },
              { field: "endTime", headerName: "退勤時間", width: 120 },
              { field: "createdAt", headerName: "作成日時", width: 180 },
              { field: "updatedAt", headerName: "更新日時", width: 180 },
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
            ]}
            autoHeight
          />
        </Box>
      </Stack>
    </Container>
  );
}
