import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import { HolidayCalendar } from "../../../API";

export default function HolidayCalendarList({
  holidayCalendars,
}: {
  holidayCalendars: HolidayCalendar[];
}) {
  const [rowModelsModel, setRowModelsModel] = useState<GridRowModesModel>({});

  return (
    <DataGrid
      rows={holidayCalendars}
      rowModesModel={rowModelsModel}
      onRowModesModelChange={(model) => setRowModelsModel(model)}
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
          getActions: (params: GridRowParams<HolidayCalendar>) => {
            const isEditMode =
              rowModelsModel[params.id]?.mode === GridRowModes.Edit;
            if (isEditMode) {
              return [
                <GridActionsCellItem
                  key={params.row.id}
                  icon={<SaveIcon />}
                  label="保存"
                />,
                <GridActionsCellItem
                  key={params.row.id}
                  icon={<CloseIcon />}
                  label="キャンセル"
                />,
              ];
            }

            return [
              <GridActionsCellItem
                key={params.row.id}
                icon={<EditIcon />}
                label="編集"
              />,
              <GridActionsCellItem
                key={params.row.id}
                icon={<DeleteIcon />}
                onClick={() => {
                  const confirm = window.confirm("本当に削除しますか？");
                  if (!confirm) return;
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
      autoHeight
    />
  );
}
