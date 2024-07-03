import "./styles.scss";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";

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
            <TableCell>摘要</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceDailyList
            .sort((a, b) => {
              const aSortKey = a.sortKey || "";
              const bSortKey = b.sortKey || "";
              return aSortKey.localeCompare(bSortKey);
            })
            .map((row, index) => (
              <TableRow key={index} className="attendance-row">
                <ActionsTableCell row={row} />
                <TableCell>{`${row.familyName} ${row.givenName}`}</TableCell>
                <StartTimeTableCell row={row} />
                <EndTimeTableCell row={row} />
                <TableCell>
                  {(() => {
                    if (!row.attendance) return "";
                    const { paidHolidayFlag, substituteHolidayDate, remarks } =
                      row.attendance;
                    const isSubstituteHoliday = substituteHolidayDate
                      ? dayjs(substituteHolidayDate).isValid()
                      : false;

                    const summaryMessage = [];
                    if (paidHolidayFlag) summaryMessage.push("有給休暇");
                    if (isSubstituteHoliday) summaryMessage.push("振替休日");
                    if (remarks) summaryMessage.push(remarks);

                    return summaryMessage.join(" ");
                  })()}
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }} />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
