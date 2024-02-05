import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import useAttendanceDaily, {
  AttendanceDaily,
} from "../../hooks/useAttendanceDaily/useAttendanceDaily";
import GetColumns from "./Column";

export default function AttendanceDailyList() {
  const navigate = useNavigate();
  const { attendanceDailyList } = useAttendanceDaily();

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={attendanceDailyList}
        columns={GetColumns()}
        getRowId={(row: AttendanceDaily) => row.sub}
        onRowClick={(params: GridRowParams<AttendanceDaily>) => {
          const { sub: staffId } = params.row;
          navigate(`/admin/staff/${staffId}/attendance`);
        }}
        autoHeight
      />
    </div>
  );
}
