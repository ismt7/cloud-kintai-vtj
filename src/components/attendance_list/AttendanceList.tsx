import { useAuthenticator } from "@aws-amplify/ui-react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Attendance } from "../../client";
import useLoginStaff from "../attendance_editor/hooks/useLoginStaff";
import GetColumns, { DataGridProps } from "./Column";
import fetchAttendanceList from "./fetchAttendanceList";
import getDayOfWeek, { DayOfWeek } from "./getDayOfWeek";

const AttendanceTable = () => {
  const { user } = useAuthenticator();
  const { loginStaff } = useLoginStaff(user?.attributes?.sub);
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

  console.log(attendances);

  return (
    <DataGrid
      rows={attendances}
      columns={GetColumns()}
      checkboxSelection
      slots={{
        noRowsOverlay: () => <div>データがありません</div>,
        footer: () => null,
      }}
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
  );
};
export default AttendanceTable;
