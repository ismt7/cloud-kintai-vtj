import { useAuthenticator } from "@aws-amplify/ui-react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { CircularProgress } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import { CompanyHolidayCalendar } from "../../../client";
import useCompanyHolidayCalendars from "./hooks/useCompanyHolidayCalendars";
import useLoginStaff from "./hooks/useLoginStaff";

export default function CompanyHolidayCalendarList() {
  const { user } = useAuthenticator();
  const { loginStaff, loading: loginStaffLoading } = useLoginStaff(
    user?.attributes?.sub
  );
  const { companyHolidayCalendars, loading: companyHolidayCalendarLoading } =
    useCompanyHolidayCalendars(loginStaff);
  const [rowModelsModel, setRowModelsModel] = useState<GridRowModesModel>({});

  if (loginStaffLoading || companyHolidayCalendarLoading) {
    return <CircularProgress />;
  }

  return (
    <DataGrid
      rows={companyHolidayCalendars}
      rowModesModel={rowModelsModel}
      onRowModesModelChange={(model) => setRowModelsModel(model)}
      columns={[
        {
          field: "holiday_date",
          headerName: "日付",
          width: 200,
          editable: true,
          valueGetter: (params) => {
            const date = dayjs(params.row.holiday_date);
            return date.format("YYYY/MM/DD");
          },
        },
        { field: "name", headerName: "名前", width: 200, editable: true },
        {
          field: "created_at",
          headerName: "作成日",
          width: 200,
          valueGetter: (params) => {
            const date = dayjs(params.row.created_at);
            return date.format("YYYY/MM/DD");
          },
        },
        {
          field: "actions",
          type: "actions",
          getActions: (params: GridRowParams<CompanyHolidayCalendar>) => {
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

                  console.log("削除");
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
