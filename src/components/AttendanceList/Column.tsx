import EditIcon from "@mui/icons-material/Edit";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { NavigateFunction } from "react-router-dom";

import {
  Attendance,
  CompanyHolidayCalendar,
  HolidayCalendar,
  Rest,
} from "../../API";
import {
  calcRestTotalTime,
  calcWorkTimeTotal,
  judgeStatus,
  makeRemarks,
  makeWorkDate,
  makeWorkEndTime,
  makeWorkStartTime,
} from "./common";

export interface DataGridProps {
  id: Attendance["id"];
  workDate: Attendance["workDate"];
  startTime: Attendance["startTime"];
  endTime: Attendance["endTime"];
  remarks: Attendance["remarks"];
  paidHolidayFlag: Attendance["paidHolidayFlag"];
  changeRequests: Attendance["changeRequests"];
  rests: Rest[];
}

export default function GetColumns(
  holidayCalendars: HolidayCalendar[],
  companyHolidayCalendars: CompanyHolidayCalendar[],
  navigate: NavigateFunction
): GridColDef[] {
  return [
    {
      field: "status",
      headerName: "ステータス",
      align: "center",
      valueGetter: (params: GridValueGetterParams<DataGridProps>) => {
        const {
          workDate,
          startTime,
          endTime,
          paidHolidayFlag,
          changeRequests,
        } = params.row;

        return judgeStatus(
          workDate,
          startTime,
          endTime,
          holidayCalendars,
          companyHolidayCalendars,
          paidHolidayFlag,
          changeRequests
        );
      },
    },
    {
      field: "workDate",
      headerName: "日付",
      align: "right",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<DataGridProps>) => {
        const { workDate } = params.row;
        return makeWorkDate(workDate, holidayCalendars);
      },
    },
    {
      field: "startTime",
      headerName: "出勤時刻",
      align: "right",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<DataGridProps>) => {
        const { startTime, paidHolidayFlag } = params.row;
        return makeWorkStartTime(startTime, paidHolidayFlag);
      },
    },
    {
      field: "endTime",
      headerName: "退勤時刻",
      align: "right",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<DataGridProps>) => {
        const { endTime, paidHolidayFlag } = params.row;
        return makeWorkEndTime(endTime, paidHolidayFlag);
      },
    },
    {
      field: "restTimeTotal",
      headerName: "休憩時間",
      align: "right",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<DataGridProps>) => {
        const { startTime, endTime, paidHolidayFlag, rests } = params.row;
        return calcRestTotalTime(startTime, endTime, paidHolidayFlag, rests);
      },
    },
    {
      field: "workTimeTotal",
      headerName: "勤務時間",
      align: "right",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<DataGridProps>) => {
        const { startTime, endTime, paidHolidayFlag, rests } = params.row;
        return calcWorkTimeTotal(
          params.row.workDate,
          startTime,
          endTime,
          paidHolidayFlag,
          rests
        );
      },
    },
    {
      field: "summary",
      headerName: "摘要",
      align: "left",
      sortable: false,
      width: 300,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<DataGridProps>) => {
        const { workDate, paidHolidayFlag, remarks } = params.row;
        return makeRemarks(
          workDate,
          paidHolidayFlag,
          remarks,
          holidayCalendars,
          companyHolidayCalendars
        );
      },
    },
    {
      field: "actions",
      headerName: "操作",
      type: "actions",
      sortable: false,
      getActions: (params: GridRowParams<DataGridProps>) => [
        <GridActionsCellItem
          key="edit"
          label="編集"
          icon={<EditIcon />}
          onClick={() => {
            const workDate = dayjs(params.row.workDate).format("YYYYMMDD");
            navigate(`/attendance/${workDate}/edit`);
          }}
        />,
      ],
    },
  ];
}
