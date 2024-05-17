import "./styles.scss";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import useAttendanceDaily from "../../hooks/useAttendanceDaily/useAttendanceDaily";
import { ActionsTableCell } from "./ActionsTableCell";
import { EndTimeTableCell } from "./EndTimeTableCell";
import { StartTimeTableCell } from "./StartTimeTableCell";

export default function AttendanceDailyList() {
  const { attendanceDailyList } = useAttendanceDaily();

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className="table-cell-header--staff-name">
              氏名
            </TableCell>
            <TableCell className="table-cell-header--start-time">
              出勤時刻
            </TableCell>
            <TableCell className="table-cell-header--end-time">
              退勤時刻
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceDailyList.map((row, index) => (
            <TableRow key={index} className="attendance-row">
              <ActionsTableCell row={row} />
              <TableCell>{`${row.familyName} ${row.givenName}`}</TableCell>
              <StartTimeTableCell row={row} />
              <EndTimeTableCell row={row} />
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
