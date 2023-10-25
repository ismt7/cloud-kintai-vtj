import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, CircularProgress, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Attendance } from "../../client";
import useLoginStaff from "../attendance_editor/hooks/useLoginStaff";
import Title from "../Title/Title";
import GetColumns, { DataGridProps } from "./Column";
import fetchAttendanceList from "./fetchAttendanceList";
import getDayOfWeek, { DayOfWeek } from "./getDayOfWeek";

const AttendanceTable = () => {
  const { user } = useAuthenticator();
  const {
    loginStaff,
    loading: loginStaffLoading,
    error: loginStaffError,
  } = useLoginStaff(user?.attributes?.sub);
  const [attendances, setAttendances] = useState<DataGridProps[]>([]);

  useEffect(() => {
    if (!loginStaff) return;

    void fetchAttendanceList(loginStaff)
      .then((value) => {
        setAttendances(value);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loginStaff]);

  if (loginStaffLoading) {
    return <CircularProgress />;
  }

  if (loginStaffError) {
    return <div>データ取得中に何らかの問題が発生しました</div>;
  }

  return (
    <Stack spacing={2}>
      <Box>
        <Title text="勤怠一覧" />
      </Box>
      <Box>
        <DataGrid
          rows={attendances}
          columns={GetColumns()}
          autoHeight
          sx={{
            "& .super-app-theme--saturday": {
              backgroundColor: "#2ACEDB",
            },
            "& .super-app-theme--sunday": {
              backgroundColor: "#B33D47",
              color: "white",
              "&:hover": {
                color: "black",
              },
            },
          }}
          getRowClassName={(params: {
            row: { workDate: Attendance["work_date"] };
          }) => {
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
        />
      </Box>
    </Stack>
  );
};
export default AttendanceTable;
