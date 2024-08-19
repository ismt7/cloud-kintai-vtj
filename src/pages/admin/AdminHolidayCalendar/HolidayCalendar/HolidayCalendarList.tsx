import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";

import { AttendanceDate } from "@/lib/AttendanceDate";

import { CompanyHolidayCalendar, HolidayCalendar } from "../../../../API";
import { useAppDispatchV2 } from "../../../../app/hooks";
import * as MESSAGE_CODE from "../../../../errors";
import useHolidayCalendar from "../../../../hooks/useHolidayCalendars/useHolidayCalendars";
import { setSnackbarError } from "../../../../lib/reducers/snackbarReducer";
import { AddHolidayCalendar } from "./AddHolidayCalendar";
import { CSVFilePicker } from "./CSVFilePicker";
import HolidayCalendarEdit from "./HolidayCalendarEdit";

export function sortCalendar(
  a: HolidayCalendar | CompanyHolidayCalendar,
  b: HolidayCalendar | CompanyHolidayCalendar
) {
  return dayjs(a.holidayDate).isBefore(dayjs(b.holidayDate)) ? 1 : -1;
}

export default function HolidayCalendarList() {
  const dispatch = useAppDispatchV2();

  const {
    holidayCalendars,
    loading: holidayCalendarLoading,
    error: holidayCalendarError,
    bulkCreateHolidayCalendar,
    updateHolidayCalendar,
    createHolidayCalendar,
  } = useHolidayCalendar();

  if (holidayCalendarLoading) {
    return <LinearProgress />;
  }

  if (holidayCalendarError) {
    dispatch(setSnackbarError(MESSAGE_CODE.E08001));
    return null;
  }

  return (
    <>
      <Stack direction="row" spacing={1}>
        <AddHolidayCalendar createHolidayCalendar={createHolidayCalendar} />
        <CSVFilePicker bulkCreateHolidayCalendar={bulkCreateHolidayCalendar} />
      </Stack>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 50 }} />
              <TableCell sx={{ width: 100 }}>日付</TableCell>
              <TableCell sx={{ width: 200 }}>名前</TableCell>
              <TableCell sx={{ width: 100 }}>作成日</TableCell>
              <TableCell sx={{ flexGrow: 1 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {holidayCalendars
              .sort(sortCalendar)
              .map((holidayCalendar, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Stack direction="row" spacing={0}>
                      <HolidayCalendarEdit
                        holidayCalendar={holidayCalendar}
                        updateHolidayCalendar={updateHolidayCalendar}
                      />
                      <IconButton>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const date = dayjs(holidayCalendar.holidayDate);
                      return date.format(AttendanceDate.DisplayFormat);
                    })()}
                  </TableCell>
                  <TableCell>{holidayCalendar.name}</TableCell>
                  <TableCell>
                    {(() => {
                      const date = dayjs(holidayCalendar.createdAt);
                      return date.format(AttendanceDate.DisplayFormat);
                    })()}
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
