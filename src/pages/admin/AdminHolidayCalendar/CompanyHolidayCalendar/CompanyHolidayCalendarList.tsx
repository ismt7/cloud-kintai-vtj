import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
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

import {
  CompanyHolidayCalendar,
  CreateCompanyHolidayCalendarInput,
  DeleteCompanyHolidayCalendarInput,
  UpdateCompanyHolidayCalendarInput,
} from "../../../../API";
import { useAppDispatchV2 } from "../../../../app/hooks";
import * as MESSAGE_CODE from "../../../../errors";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../../../lib/reducers/snackbarReducer";
import AddCompanyHolidayCalendarDialog from "./AddCompanyHolidayCalendarDialog";
import CompanyHolidayCalendarEdit from "./CompanyHolidayCalendarEdit";

export default function CompanyHolidayCalendarList({
  companyHolidayCalendars,
  createCompanyHolidayCalendar,
  deleteCompanyHolidayCalendar,
  updateCompanyHolidayCalendar,
}: {
  companyHolidayCalendars: CompanyHolidayCalendar[];
  createCompanyHolidayCalendar: (
    input: CreateCompanyHolidayCalendarInput
  ) => Promise<CompanyHolidayCalendar>;
  deleteCompanyHolidayCalendar: (
    input: DeleteCompanyHolidayCalendarInput
  ) => Promise<CompanyHolidayCalendar>;
  updateCompanyHolidayCalendar: (
    input: UpdateCompanyHolidayCalendarInput
  ) => Promise<CompanyHolidayCalendar>;
}) {
  const dispatch = useAppDispatchV2();
  const [editRow, setEditRow] = useState<CompanyHolidayCalendar | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("本当に削除しますか？");
    if (!confirm) return;

    deleteCompanyHolidayCalendar({ id })
      .then(() => dispatch(setSnackbarSuccess(MESSAGE_CODE.S08004)))
      .catch(() => dispatch(setSnackbarError(MESSAGE_CODE.E08004)));
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<AddCircleOutlineOutlinedIcon />}
        onClick={() => {
          setAddDialogOpen(true);
        }}
      >
        休日を追加
      </Button>
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
              .sort((a, b) =>
                dayjs(a.holidayDate).isBefore(dayjs(b.holidayDate)) ? -1 : 1
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
                      <IconButton
                        onClick={() => {
                          handleDelete(holidayCalendar.id);
                        }}
                      >
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
      <AddCompanyHolidayCalendarDialog
        open={addDialogOpen}
        onClose={() => {
          setAddDialogOpen(false);
        }}
        onSubmit={(data) => {
          createCompanyHolidayCalendar(data)
            .then(() => {
              dispatch(setSnackbarSuccess(MESSAGE_CODE.S08002));
              setAddDialogOpen(false);
            })
            .catch(() => dispatch(setSnackbarError(MESSAGE_CODE.E08002)));
        }}
      />
      <CompanyHolidayCalendarEdit
        editRow={editRow}
        open={!!editRow}
        onClose={() => {
          setEditRow(null);
        }}
        onSubmit={(data) => {
          const { id, holidayDate } = data;
          if (!id || !holidayDate) return;

          updateCompanyHolidayCalendar({
            id,
            holidayDate: holidayDate.format("YYYY-MM-DD"),
            name: data.name,
          })
            .then(() => {
              dispatch(setSnackbarSuccess(MESSAGE_CODE.S08003));
              setEditRow(null);
            })
            .catch(() => dispatch(setSnackbarError(MESSAGE_CODE.E08003)));
        }}
      />
    </>
  );
}
