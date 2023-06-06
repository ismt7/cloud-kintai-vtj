import { DataGrid, GridColDef } from "@mui/x-data-grid";

const AttendanceTable = () => {
  const columns: GridColDef[] = [
    {
      field: "staffName",
      headerName: "名前",
      align: "left",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "ステータス",
      align: "left",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "startTime",
      headerName: "始業時間",
      align: "left",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "endTime",
      headerName: "終業時間",
      align: "left",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "totalTime",
      headerName: "総稼働時間",
      align: "left",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "workingRate",
      headerName: "稼働率",
      align: "left",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "workingDays",
      headerName: "勤務日数",
      align: "left",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "操作",
      align: "left",
      sortable: false,
      headerAlign: "center",
    },
  ];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        rows={[]}
        columns={columns}
        checkboxSelection
        components={{
          NoRowsOverlay: () => <div>データがありません</div>,
          Footer: () => null,
        }}
      />
    </div>
  );
};
export default AttendanceTable;
