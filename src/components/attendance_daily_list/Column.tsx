import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Attendance, Staff } from "../../client";

export interface SummaryAttendance {
  id: Staff["id"];
  lastName: Staff["last_name"];
  firstName: Staff["first_name"];
  workStatus: string;
  startTime: Attendance["start_time"];
  endTime: Attendance["end_time"];
  totalWorkHoursPerMonth: number;
  totalWorkDaysPerMonth: number;
}

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
      valueGetter: (params: GridValueGetterParams<SummaryAttendance>) => {
        const { lastName, firstName } = params.row;
        return `${lastName || ""} ${firstName || ""}`;
      },
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
      field: "startTime",
      type: "string",
      headerName: "出勤時刻",
      align: "right",
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "endTime",
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
      headerName: "稼働率(%)",
      align: "right",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<SummaryAttendance>) => {
        const { totalWorkHoursPerMonth } = params.row;
        const totalWorkHoursPerMonthNumber = Number(totalWorkHoursPerMonth);
        if (totalWorkHoursPerMonthNumber === 0) return 0;
        return Math.round((totalWorkHoursPerMonthNumber / 160) * 100);
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
