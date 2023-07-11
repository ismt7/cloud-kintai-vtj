import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function GetColumns(): GridColDef[] {
  const navigate = useNavigate();

  return [
    {
      field: "id",
      type: "number",
      headerName: "スタッフコード",
      align: "right",
      sortable: false,
      width: 150,
      headerAlign: "center",
    },
    {
      field: "fullName",
      type: "string",
      headerName: "氏名",
      align: "right",
      sortable: false,
      headerAlign: "center",
      width: 150,
    },
    {
      field: "workStatus",
      type: "string",
      headerName: "ステータス",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "clockInTime",
      type: "string",
      headerName: "出勤時刻",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "clockOutTime",
      type: "string",
      headerName: "退勤時刻",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "totalWorkHoursPerMonth",
      headerName: "総稼動時間(h)",
      align: "right",
      sortable: false,
      headerAlign: "center",
      width: 150,
    },
    {
      field: "operatingRate",
      headerName: "稼働率",
      align: "right",
      sortable: false,
      headerAlign: "center",
      valueFormatter: (params) => {
        const value = params.value as number;
        return `${value} %`;
      },
    },
    {
      field: "totalWorkDaysPerMonth",
      type: "number",
      headerName: "勤務日数(日)",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      sortable: false,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          icon={<EditIcon />}
          onClick={() => {
            const now = dayjs();
            const targetWorkDate = now.format("YYYYMMDD");
            navigate(`/admin/attendances/edit/${targetWorkDate}/${params.id}`);
          }}
          label="編集"
        />,
      ],
    },
  ];
}
