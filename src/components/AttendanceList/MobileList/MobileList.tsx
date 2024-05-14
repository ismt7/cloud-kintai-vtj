import "./styles.scss";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import { Box, styled, TableContainer } from "@mui/material";

import {
  Attendance,
  CompanyHolidayCalendar,
  HolidayCalendar,
  Staff,
} from "../../../API";
import TableBodyRow from "./TableBodyRow";

const MobileBox = styled(Box)(({ theme }) => ({
  padding: "0px 0px 40px 0px",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export default function MobileList({
  attendances,
  holidayCalendars,
  companyHolidayCalendars,
  staff,
}: {
  attendances: Attendance[];
  holidayCalendars: HolidayCalendar[];
  companyHolidayCalendars: CompanyHolidayCalendar[];
  staff: Staff | null | undefined;
}) {
  return (
    <MobileBox>
      <TableContainer>
        <Table size="small" className="amplify-table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell className="table-td-head">日付</TableCell>
              <TableCell className="table-td-head">出勤時間</TableCell>
              <TableCell className="table-td-head">退勤時間</TableCell>
              <TableCell className="table-td-head">休憩時間</TableCell>
              <TableCell className="table-td-head">勤務時間</TableCell>
              <TableCell className="table-td-description">備考</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendances.map((attendance, index) => (
              <TableBodyRow
                key={index}
                attendance={attendance}
                holidayCalendars={holidayCalendars}
                companyHolidayCalendars={companyHolidayCalendars}
                staff={staff}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MobileBox>
  );
}
