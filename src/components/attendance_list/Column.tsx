import { GridColDef } from "@mui/x-data-grid";

import Button from "../button/Button";

export default function GetColumns(): GridColDef[] {
  return [
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
      align: "left",
      sortable: false,
      width: 300,
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
}
