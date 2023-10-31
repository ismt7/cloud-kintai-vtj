import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridRowModesModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useParams } from "react-router-dom";
import getColumns from "./getColumns";
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
        <Typography variant="h4">{staff.last_name} さんの勤怠</Typography>
        <Box>
          <DataGrid
            rows={attendances || []}
            rowModesModel={rowModelsModel}
            onRowModesModelChange={(model) => setRowModelsModel(model)}
            columns={getColumns(deleteAttendance, rowModelsModel)}
            autoHeight
          />
        </Box>
      </Stack>
    </Container>
  );
}
