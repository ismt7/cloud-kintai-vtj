import DeleteIcon from "@mui/icons-material/Delete";
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

import { HolidayCalendar, UpdateHolidayCalendarInput } from "../../../../API";
import HolidayCalendarEdit from "./HolidayCalendarEditDialog";

export default function HolidayCalendarList({
  holidayCalendars,
  updateHolidayCalendar,
}: {
  holidayCalendars: HolidayCalendar[];
  updateHolidayCalendar: (
    input: UpdateHolidayCalendarInput
  ) => Promise<HolidayCalendar>;
}) {
  const sortCalendar = (a: HolidayCalendar, b: HolidayCalendar) =>
    dayjs(a.holidayDate).isBefore(dayjs(b.holidayDate)) ? 1 : -1;

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
    </>
  );
}
