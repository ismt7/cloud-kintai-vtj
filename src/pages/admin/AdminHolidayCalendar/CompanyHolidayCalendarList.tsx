import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import {
  CompanyHolidayCalendar,
  CreateCompanyHolidayCalendarInput,
  DeleteCompanyHolidayCalendarInput,
  UpdateCompanyHolidayCalendarInput,
} from "../../../API";
import { useAppDispatchV2 } from "../../../app/hooks";
import { E08002, E08004, S08001, S08004 } from "../../../errors";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../../lib/reducers/snackbarReducer";
import AddCompanyHolidayCalendarDialog from "./AddCompanyHolidayCalendarDialog";
import EditCompanyHolidayCalendarDialog from "./EditCompanyHolidayCalendarDialog";

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
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const customToolbar = () => (
    <GridToolbarContainer>
      <Button
        variant="text"
        size="small"
        startIcon={<AddCircleIcon />}
        onClick={() => {
          setAddDialogOpen(true);
        }}
      >
        休日を追加
      </Button>
    </GridToolbarContainer>
  );

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  return (
    <>
      <DataGrid
        rows={companyHolidayCalendars}
        autoHeight
        disableRowSelectionOnClick
        columns={[
          {
            field: "holidayDate",
            headerName: "日付",
            width: 200,
            editable: true,
            valueGetter: (params) => {
              const date = dayjs(params.row.holidayDate);
              return date.format("YYYY/MM/DD");
            },
          },
          { field: "name", headerName: "名前", width: 200, editable: true },
          {
            field: "createdAt",
            headerName: "作成日",
            width: 200,
            valueGetter: (params) => {
              const date = dayjs(params.row.createdAt);
              return date.format("YYYY/MM/DD");
            },
          },
          {
            field: "actions",
            type: "actions",
            getActions: (params: GridRowParams<CompanyHolidayCalendar>) => {
              const isEditMode =
                rowModesModel[params.id]?.mode === GridRowModes.Edit;
              if (isEditMode) {
                return [
                  <GridActionsCellItem
                    key={params.row.id}
                    icon={<SaveIcon />}
                    label="保存"
                    onClick={handleSaveClick(params.id)}
                  />,
                  <GridActionsCellItem
                    key={params.row.id}
                    label="キャンセル"
                    icon={<CloseIcon />}
                    onClick={handleCancelClick(params.id)}
                  />,
                ];
              }

              return [
                <GridActionsCellItem
                  key={params.row.id}
                  icon={<EditIcon />}
                  label="編集"
                  onClick={() => {
                    setEditRow(params.row);
                  }}
                />,
                <GridActionsCellItem
                  key={params.row.id}
                  icon={<DeleteIcon />}
                  onClick={() => {
                    const confirm = window.confirm("本当に削除しますか？");
                    if (!confirm) return;

                    deleteCompanyHolidayCalendar({
                      id: params.row.id,
                    })
                      .then(() => {
                        dispatch(setSnackbarSuccess(S08004));
                      })
                      .catch(() => dispatch(setSnackbarError(E08004)));
                  }}
                  label="削除"
                />,
              ];
            },
          },
        ]}
        sortModel={[
          {
            field: "holiday_date",
            sort: "desc",
          },
        ]}
        slots={{
          toolbar: customToolbar,
        }}
      />
      <AddCompanyHolidayCalendarDialog
        open={addDialogOpen}
        onClose={() => {
          setAddDialogOpen(false);
        }}
        onSubmit={(data) => {
          createCompanyHolidayCalendar(data)
            .then(() => {
              dispatch(setSnackbarSuccess(S08001));
              setAddDialogOpen(false);
            })
            .catch(() => dispatch(setSnackbarError(E08002)));
        }}
      />
      <EditCompanyHolidayCalendarDialog
        editRow={editRow}
        open={!!editRow}
        onClose={() => {
          setEditRow(null);
        }}
        onSubmit={(data) => {
          if (!data.id || !data.holidayDate) return;

          updateCompanyHolidayCalendar({
            id: data.id,
            holidayDate: data.holidayDate.toISOString(),
            name: data.name,
          })
            .then(() => {
              dispatch(setSnackbarSuccess(S08004));
              setEditRow(null);
            })
            .catch(() => dispatch(setSnackbarError(E08004)));
        }}
      />
    </>
  );
}
