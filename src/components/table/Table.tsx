import { useEffect } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { selectLoginStaff, selectTimeRecordList } from "../../lib/store";
import fetchTimeRecordList from "../../lib/time_record_list/FetchTimeRecordList";
import Button from "../button/Button";

const Table = () => {
  const staff = useAppSelector(selectLoginStaff);
  const timeRecordList = useAppSelector(selectTimeRecordList);
  const dispatch = useAppDispatch();
  const now = dayjs();

  useEffect(() => {
    if (!staff.data) return;
    void dispatch(
      fetchTimeRecordList({
        staffId: staff.data.staffId,
        targetFromWorkDate: now.subtract(30, "d"),
        targetToWorkDate: now,
      })
    );
  }, []);

  const columns: GridColDef[] = [
    {
      field: "workDate",
      headerName: "日付",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "dayOfWeek",
      headerName: "曜日",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "clockInTime",
      headerName: "出勤時刻",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "clockOutTime",
      headerName: "退勤時刻",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "restTimeTotal",
      headerName: "休憩時間",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "workTimeTotal",
      headerName: "勤務時間",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "summary",
      headerName: "摘要",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "editAction",
      headerName: "操作",
      align: "center",
      sortable: false,
      headerAlign: "center",
      renderCell: () => (
        <Button color="primary" size="small" label="編集" onClick={() => {}} />
      ),
    },
  ];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        rows={timeRecordList.data}
        columns={columns}
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
    </div>
  );
};
export default Table;
