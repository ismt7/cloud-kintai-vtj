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

import { useAppDispatchV2 } from "../../../../app/hooks";
import * as MESSAGE_CODE from "../../../../errors";
import useCompanyHolidayCalendars from "../../../../hooks/useCompanyHolidayCalendars/useCompanyHolidayCalendars";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../../../lib/reducers/snackbarReducer";
import { ExcelFilePicker } from "../HolidayCalendar/ExcelFilePicker";
import { sortCalendar } from "../HolidayCalendar/HolidayCalendarList";
import AddCompanyHolidayCalendar from "./AddCompanyHolidayCalendar";
import CompanyHolidayCalendarEdit from "./CompanyHolidayCalendarEdit";

export default function CompanyHolidayCalendarList() {
  const dispatch = useAppDispatchV2();

  const {
    companyHolidayCalendars,
    loading: companyHolidayCalendarLoading,
    error: companyHolidayCalendarError,
    createCompanyHolidayCalendar,
    updateCompanyHolidayCalendar,
    deleteCompanyHolidayCalendar,
    bulkCreateCompanyHolidayCalendar,
  } = useCompanyHolidayCalendars();

  const handleDelete = (id: string) => {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("本当に削除しますか？");
    if (!confirm) return;

    deleteCompanyHolidayCalendar({ id })
      .then(() => dispatch(setSnackbarSuccess(MESSAGE_CODE.S08004)))
      .catch(() => dispatch(setSnackbarError(MESSAGE_CODE.E08004)));
  };

  if (companyHolidayCalendarLoading) {
    return <LinearProgress />;
  }

  if (companyHolidayCalendarError) {
    dispatch(setSnackbarError(MESSAGE_CODE.E08001));
    return null;
  }

  return (
    <>
      <Stack direction="row" spacing={1}>
        <AddCompanyHolidayCalendar
          createCompanyHolidayCalendar={createCompanyHolidayCalendar}
        />
        <ExcelFilePicker
          bulkCreateCompanyHolidayCalendar={bulkCreateCompanyHolidayCalendar}
        />
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
            {companyHolidayCalendars
              .sort(sortCalendar)
              .map((holidayCalendar, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Stack direction="row" spacing={0}>
                      <CompanyHolidayCalendarEdit
                        holidayCalendar={holidayCalendar}
                        updateCompanyHolidayCalendar={
                          updateCompanyHolidayCalendar
                        }
                      />
                      <IconButton
                        onClick={() => handleDelete(holidayCalendar.id)}
                      >
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
