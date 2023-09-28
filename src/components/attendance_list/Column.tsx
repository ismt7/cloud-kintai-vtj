import {
  GridActionsCellItem,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { Attendance, Rest } from "../../client";
import getDayOfWeek from "./getDayOfWeek";

export interface DataGridProps {
  id: Attendance["id"];
  workDate: Attendance["work_date"];
  startTime: Attendance["start_time"];
  endTime: Attendance["end_time"];
  remarks: Attendance["remarks"];
  rests: Rest[];
}

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
      valueGetter: (params: GridValueGetterParams<DataGridProps>) =>
        getDayOfWeek(params.row.workDate),
    },
    {
      field: "startTime",
      headerName: "出勤時刻",
      align: "right",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<DataGridProps>) => {
        const { startTime } = params.row;
        if (!startTime) return "";

        const startTimeFormat = dayjs(startTime).format("HH:mm");
        return startTimeFormat;
      },
    },
    {
      field: "endTime",
      headerName: "退勤時刻",
      align: "right",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<DataGridProps>) => {
        const { endTime } = params.row;
        if (!endTime) return "";

        const endTimeFormat = dayjs(endTime).format("HH:mm");
        return endTimeFormat;
      },
    },
    {
      field: "restTimeTotal",
      headerName: "休憩時間",
      align: "right",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<DataGridProps>) => {
        const { rests } = params.row;
        if (rests.length === 0) return "00:00";

        const restTimeTotal = rests.reduce((acc, cur) => {
          const { start_time: startTime, end_time: endTime } = cur;
          if (!startTime || !endTime) return acc;

          const start = dayjs(startTime);
          const end = dayjs(endTime);
          const restTime = end.diff(start, "minute");
          return acc + restTime;
        }, 0);

        return `${Math.floor(restTimeTotal / 60)
          .toString()
          .padStart(2, "0")}:${(restTimeTotal % 60)
          .toString()
          .padStart(2, "0")}`;
      },
    },
    {
      field: "workTimeTotal",
      headerName: "勤務時間",
      align: "right",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<DataGridProps>) => {
        const { startTime, endTime, rests } = params.row;
        if (!startTime || !endTime) return "(計算中)";

        const start = dayjs(startTime);
        const end = dayjs(endTime);
        const workTime = end.diff(start, "minute");
        const restTimeTotal = rests.reduce((acc, cur) => {
          const { start_time: restStartTime, end_time: restEndTime } = cur;
          if (!restStartTime || !restEndTime) return acc;

          const restStart = dayjs(restStartTime);
          const restEnd = dayjs(restEndTime);
          const restTime = restEnd.diff(restStart, "minute");
          return acc + restTime;
        }, 0);

        const workTimeTotal = workTime - restTimeTotal;
        return `${Math.floor(workTimeTotal / 60)
          .toString()
          .padStart(2, "0")}:${(workTimeTotal % 60)
          .toString()
          .padStart(2, "0")}`;
      },
    },
    {
      field: "summary",
      headerName: "摘要",
      align: "left",
      sortable: false,
      width: 300,
      headerAlign: "center",
      valueGetter: (params: GridValueGetterParams<Attendance>) =>
        params.row.remarks ? params.row.remarks : "",
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
