import { useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { selectLoginStaff, selectTimeRecordList } from "../../lib/store";
import fetchTimeRecordList from "../../lib/time_record_list/FetchTimeRecordList";

import GetColumns from "./Column";

const AttendanceTable = () => {
  const now = dayjs();

  const { data: staff } = useAppSelector(selectLoginStaff);
  const { data: timeRecords } = useAppSelector(selectTimeRecordList);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!staff) return;

    void dispatch(
      fetchTimeRecordList({
        staffId: staff.staffId,
        targetFromWorkDate: now.subtract(30, "d"),
        targetToWorkDate: now,
      })
    );
  }, []);

  return (
    <DataGrid
      rows={timeRecords}
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
      getRowClassName={(params: { row: { dayOfWeek: string } }) => {
        switch (params.row.dayOfWeek) {
          case "土":
            return "super-app-theme--saturday";
          case "日":
            return "super-app-theme--sunday";
          default:
            return "super-app-theme--default";
        }
      }}
    />
  );
};
export default AttendanceTable;
