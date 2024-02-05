import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

import { HolidayCalendar, UpdateHolidayCalendarInput } from "../../../../API";
import { useAppDispatchV2 } from "../../../../app/hooks";
import * as MESSAGE_CODE from "../../../../errors";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../../../lib/reducers/snackbarReducer";
import HolidayCalendarEditDialog from "./HolidayCalendarEditDialog";

export default function HolidayCalendarList({
  holidayCalendars,
  updateHolidayCalendar,
}: {
  holidayCalendars: HolidayCalendar[];
  updateHolidayCalendar: (
    input: UpdateHolidayCalendarInput
  ) => Promise<HolidayCalendar>;
}) {
  const dispatch = useAppDispatchV2();
  const [editRow, setEditRow] = useState<HolidayCalendar | null>(null);

  return (
    <>
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
              .sort((a, b) =>
                dayjs(a.holidayDate).isBefore(dayjs(b.holidayDate)) ? 1 : -1
              )
              .map((holidayCalendar, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Stack direction="row" spacing={0}>
                      <IconButton
                        onClick={() => {
                          setEditRow(holidayCalendar);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const date = dayjs(holidayCalendar.holidayDate);
                      return date.format("YYYY/MM/DD");
                    })()}
                  </TableCell>
                  <TableCell>{holidayCalendar.name}</TableCell>
                  <TableCell>
                    {(() => {
                      const date = dayjs(holidayCalendar.createdAt);
                      return date.format("YYYY/MM/DD");
                    })()}
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <HolidayCalendarEditDialog
        editRow={editRow}
        open={!!editRow}
        onClose={() => setEditRow(null)}
        onSubmit={(data) => {
          if (!data.id || !data.holidayDate) return;

          void updateHolidayCalendar({
            id: data.id,
            holidayDate: data.holidayDate.toISOString(),
            name: data.name,
          })
            .then(() => {
              dispatch(setSnackbarSuccess(MESSAGE_CODE.S07003));
              setEditRow(null);
            })
            .catch(() => {
              dispatch(setSnackbarError(MESSAGE_CODE.E07003));
            });
        }}
      />
    </>
  );
}
