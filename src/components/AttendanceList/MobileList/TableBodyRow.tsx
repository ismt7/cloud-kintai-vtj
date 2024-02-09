import { TableCell as MuiTableCell, TableRow } from "@aws-amplify/ui-react";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";

import {
  Attendance,
  CompanyHolidayCalendar,
  HolidayCalendar,
} from "../../../API";
import {
  calcRestTotalTime,
  calcWorkTimeTotal,
  judgeStatus,
  makeRemarks,
  makeWorkDate,
} from "../common";
import getDayOfWeek, { DayOfWeek } from "../getDayOfWeek";
import TableCell from "./TableCell";

function formatTime(time: string | null | undefined) {
  return time ? dayjs(time).format("HH:mm") : "";
}

function selectClassName(
  workDate: string,
  holidayCalendars: HolidayCalendar[],
  companyHolidayCalendars: CompanyHolidayCalendar[]
) {
  const today = dayjs().format("YYYY-MM-DD");
  if (workDate === today) {
    return "table-tr-today";
  }

  const isHoliday = holidayCalendars?.find(
    (holidayCalendar) => holidayCalendar.holidayDate === workDate
  );

  const isCompanyHoliday = companyHolidayCalendars?.find(
    (companyHolidayCalendar) => companyHolidayCalendar.holidayDate === workDate
  );

  if (isHoliday || isCompanyHoliday) {
    return "table-tr-sunday";
  }

  const dayOfWeek = getDayOfWeek(workDate);
  switch (dayOfWeek) {
    case DayOfWeek.Sat:
      return "table-tr-saturday";
    case DayOfWeek.Sun:
      return "table-tr-sunday";
    default:
      return "table-tr";
  }
}

export default function TableBodyRow({
  attendance,
  holidayCalendars,
  companyHolidayCalendars,
}: {
  attendance: Attendance;
  holidayCalendars: HolidayCalendar[];
  companyHolidayCalendars: CompanyHolidayCalendar[];
}) {
  const {
    workDate,
    startTime,
    endTime,
    paidHolidayFlag,
    remarks,
    changeRequests,
  } = attendance;

  const rests = attendance.rests
    ? attendance.rests.filter(
        (item): item is NonNullable<typeof item> => !!item
      )
    : [];

  return (
    <TableRow
      className={selectClassName(
        workDate,
        holidayCalendars,
        companyHolidayCalendars
      )}
    >
      <MuiTableCell>
        <IconButton>
          <EditIcon fontSize="small" />
        </IconButton>
      </MuiTableCell>
      <TableCell className="table-td-body">
        {judgeStatus(
          workDate,
          startTime,
          endTime,
          holidayCalendars,
          companyHolidayCalendars,
          paidHolidayFlag,
          changeRequests
        )}
      </TableCell>
      <TableCell className="table-td-body-date">
        {makeWorkDate(workDate, holidayCalendars)}
      </TableCell>
      <TableCell className="table-td-body-time">
        {formatTime(startTime)}
      </TableCell>
      <TableCell className="table-td-body-time">
        {formatTime(endTime)}
      </TableCell>
      <TableCell className="table-td-body-time">
        {calcRestTotalTime(startTime, endTime, paidHolidayFlag, rests)}
      </TableCell>
      <TableCell className="table-td-body-time">
        {calcWorkTimeTotal(
          workDate,
          startTime,
          endTime,
          paidHolidayFlag,
          rests
        )}
      </TableCell>
      <TableCell className="table-td-description">
        {makeRemarks(
          workDate,
          paidHolidayFlag,
          remarks,
          holidayCalendars,
          companyHolidayCalendars
        )}
      </TableCell>
    </TableRow>
  );
}
