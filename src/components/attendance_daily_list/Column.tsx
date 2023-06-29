import { GridColDef } from "@mui/x-data-grid";

import Button from "../button/Button";

export default function GetColumns(): GridColDef[] {
  return [
    {
      field: "code",
      headerName: "コード",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "fullName",
      headerName: "氏名",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "ステータス",
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
      field: "workTimeTotal",
      headerName: "勤務時間",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "operatingRate",
      headerName: "稼働率",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "workDays",
      headerName: "勤務日数",
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
        <Button color="primary" size="small" label="詳細" onClick={() => {}} />
      ),
    },
  ];
}
