import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";

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
      field: "actions",
      type: "actions",
      sortable: false,
      getActions: () => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          onClick={() => {}}
          label="編集"
        />,
      ],
    },
  ];
}
