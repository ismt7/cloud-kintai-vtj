import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Attendance, Staff } from "../../client";
import GetColumns, { DataGridProps } from "./Column";
import fetchAttendanceList from "./fetchAttendanceList";
import fetchLoginStaff from "./fetchLoginStaff";
import getDayOfWeek, { DayOfWeek } from "./getDayOfWeek";

const AttendanceTable = ({
  cognitoUserId,
}: {
  cognitoUserId: string | undefined;
}) => {
  const [staff, setStaff] = useState<Staff | null>(null);
  const [attendances, setAttendances] = useState<DataGridProps[]>([]);

  useEffect(() => {
    if (!cognitoUserId) return;

    void fetchLoginStaff(cognitoUserId)
      .then((value) => setStaff(value))
      .catch((error) => {
        console.log(error);
      });
  }, [cognitoUserId]);

  useEffect(() => {
    if (!staff) return;

    void fetchAttendanceList(staff)
      .then((value) => {
        setAttendances(value);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [staff]);

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
