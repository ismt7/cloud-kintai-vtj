import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { AttendanceDaily } from "../../hooks/useAttendanceDaily/useAttendanceDaily";

// export interface SummaryAttendance {
//   id: Staff["id"];
//   lastName: Staff["last_name"];
//   firstName: Staff["first_name"];
//   workStatus: string;
//   startTime: Attendance["endTime"];
//   endTime: Attendance["endTime"];
//   totalWorkHoursPerMonth: number;
//   totalWorkDaysPerMonth: number;
// }

export default function GetColumns(): GridColDef[] {
  const navigate = useNavigate();

  return [
    {
      field: "fullName",
      type: "string",
      headerName: "氏名",
      align: "left",
      sortable: false,
      headerAlign: "center",
      width: 150,
      valueGetter: (params: GridValueGetterParams<AttendanceDaily>) => {
        const { familyName, givenName } = params.row;
        if (!familyName && !givenName) return "(未設定)";

        return `${familyName || ""} ${givenName || ""}`;
      },
    },
    // {
    //   field: "workStatus",
    //   type: "string",
    //   headerName: "ステータス",
    //   align: "right",
    //   sortable: false,
    //   headerAlign: "center",
    // },
    {
      field: "startTime",
      type: "string",
      headerName: "出勤時刻",
      align: "center",
      sortable: false,
      headerAlign: "center",
      valueGetter(params: GridValueGetterParams<AttendanceDaily>) {
        if (params.row.attendance === null) return "--:--";

        const { startTime } = params.row.attendance;
        if (!startTime) return "--:--";

        return dayjs(startTime).format("HH:mm");
      },
    },
    {
      field: "endTime",
      type: "string",
      headerName: "退勤時刻",
      align: "center",
      sortable: false,
      headerAlign: "center",
      valueGetter(params: GridValueGetterParams<AttendanceDaily>) {
        if (params.row.attendance === null) return "--:--";

        const { endTime } = params.row.attendance;
        if (!endTime) return "--:--";

        return dayjs(endTime).format("HH:mm");
      },
    },
    // {
    //   field: "totalWorkHoursPerMonth",
    //   headerName: "総稼動時間(h)",
    //   align: "right",
    //   sortable: false,
    //   headerAlign: "center",
    //   width: 150,
    // },
    // {
    //   field: "operatingRate",
    //   headerName: "稼働率(%)",
    //   align: "right",
    //   sortable: false,
    //   headerAlign: "center",
    //   valueGetter: (params: GridValueGetterParams<SummaryAttendance>) => {
    //     const { totalWorkHoursPerMonth, totalWorkDaysPerMonth } = params.row;
    //     const totalWorkHoursPerMonthNumber = Number(totalWorkHoursPerMonth);
    //     const currentTotalWorkHoursPerMonthNumber = totalWorkDaysPerMonth * 8;

    //     if (
    //       totalWorkHoursPerMonthNumber === 0 ||
    //       currentTotalWorkHoursPerMonthNumber === 0
    //     ) {
    //       return 0;
    //     }

    //     return Math.round(
    //       (totalWorkHoursPerMonthNumber / currentTotalWorkHoursPerMonthNumber) *
    //         100
    //     );
    //   },
    // },
    // {
    //   field: "totalWorkDaysPerMonth",
    //   type: "number",
    //   headerName: "勤務日数(日)",
    //   align: "right",
    //   sortable: false,
    //   headerAlign: "center",
    // },
    {
      // TODO: #180 勤怠管理画面のアクション列名に「操作」と表示
      // TODO: #181 一覧表示のアクションを追加
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
