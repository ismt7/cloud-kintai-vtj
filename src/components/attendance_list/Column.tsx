import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { NavigateFunction } from "react-router-dom";
import {
  Attendance,
  CompanyHolidayCalendar,
  HolidayCalendar,
  Rest,
} from "../../API";

import getDayOfWeek from "./getDayOfWeek";

export function statusValueGetter(
  workDate: Attendance["workDate"],
  startTime: Attendance["startTime"],
  endTime: Attendance["endTime"],
  holidayCalendars: HolidayCalendar[],
  companyHolidayCalendars: CompanyHolidayCalendar[],
  paidHolidayFlag: Attendance["paidHolidayFlag"]
) {
  if (paidHolidayFlag) return "OK";

  const today = dayjs().format("YYYY-MM-DD");
  const dayOfWeek = getDayOfWeek(workDate);
  const isHoliday = holidayCalendars?.find(
    (holiday) => holiday.holidayDate === workDate
  );
  const isCompanyHoliday = companyHolidayCalendars?.find(
    (companyHoliday) => companyHoliday.holidayDate === workDate
  );

  if (isHoliday || isCompanyHoliday) return "";

  switch (dayOfWeek) {
    case "月":
    case "火":
    case "水":
    case "木":
    case "金":
      if (today === workDate) {
        if (!startTime) return "遅刻";
        if (!endTime) return "勤務中";
      }
      return !startTime || !endTime ? "エラー" : "OK";

    case "土":
    case "日":
      if (!startTime && !endTime) return "";
      return "OK";

    default:
      return "";
  }
}

export interface DataGridProps {
  id: Attendance["id"];
  workDate: Attendance["workDate"];
  startTime: Attendance["startTime"];
  endTime: Attendance["endTime"];
  remarks: Attendance["remarks"];
  paidHolidayFlag: Attendance["paidHolidayFlag"];
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
        const { workDate, startTime, endTime, paidHolidayFlag } = params.row;
        return statusValueGetter(
          workDate,
          startTime,
          endTime,
          holidayCalendars,
          companyHolidayCalendars,
          paidHolidayFlag
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
        if (!workDate) return "";
        const date = dayjs(workDate);
        const isHoliday = holidayCalendars?.find(
          ({ holidayDate }) => holidayDate === params.row.workDate
        );
        const dayOfWeek = isHoliday ? "祝" : getDayOfWeek(params.row.workDate);
        return `${date.format("M/D")}(${dayOfWeek})`;
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
        if (paidHolidayFlag) {
          return "09:00";
        }

        if (!startTime) return "";

        const date = dayjs(startTime);
        return date.format("HH:mm");
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
        if (paidHolidayFlag) {
          return "18:00";
        }

        if (!endTime) return "";

        const date = dayjs(endTime);
        return date.format("HH:mm");
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
        if (paidHolidayFlag) {
          return "01:00";
        }

        if (!startTime && !endTime) return "";
        if (rests.length === 0) return "00:00";

        const restTimeTotal = rests.reduce((acc, cur) => {
          const { startTime: restStartTime, endTime: restEndTime } = cur;
          if (!restStartTime || !restEndTime) return acc;

          const start = dayjs(restStartTime);
          const end = dayjs(restEndTime);
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
        const today = dayjs().format("YYYY-MM-DD");
        const { startTime, endTime, paidHolidayFlag, rests } = params.row;
        if (paidHolidayFlag) {
          return "08:00";
        }

        if (!startTime && !endTime) return "";

        if (!startTime || !endTime) {
          return today === params.row.workDate ? "(計算中)" : "--:--";
        }

        const start = dayjs(startTime);
        const end = dayjs(endTime);
        const workTime = end.diff(start, "minute");
        const restTimeTotal = rests.reduce((acc, cur) => {
          const { startTime: restStartTime, endTime: restEndTime } = cur;
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
      valueGetter: (params: GridValueGetterParams<DataGridProps>) => {
        const { workDate, paidHolidayFlag } = params.row;
        const isHoliday = holidayCalendars?.find(
          ({ holidayDate }) => holidayDate === workDate
        );

        const isCompanyHoliday = companyHolidayCalendars?.find(
          ({ holidayDate }) => holidayDate === workDate
        );

        const summaryMessage = [];
        if (paidHolidayFlag) summaryMessage.push("有給休暇");
        if (isHoliday) summaryMessage.push(isHoliday.name);
        if (isCompanyHoliday) summaryMessage.push(isCompanyHoliday.name);
        if (params.row.remarks) summaryMessage.push(params.row.remarks);
        return summaryMessage.join(" ");
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
