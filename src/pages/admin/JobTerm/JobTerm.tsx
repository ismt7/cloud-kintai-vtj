import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridActionsCellItem,
  GridColDef,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
} from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { AttendanceClosingDate } from "../../../client";
import useClosingDates from "./hooks/useClosingDates";

type Inputs = {
  closingDate: dayjs.Dayjs | null;
};

const variationSchema = z.object({
  closingDate: z
    .custom<dayjs.Dayjs>()
    .refine((value) => !!value, {
      message: "締日を選択してください。",
    })
    .refine(
      (value) => {
        if (!value) return false;
        const now = dayjs();
        const closingDate = dayjs(value);
        const isBefore = closingDate.isBefore(now);
        return !isBefore;
      },
      {
        message: "締日は過去の日付を選択できません。",
      }
    ),
});

function getColumns(
  rowModelsModel: GridRowModesModel
): GridColDef<AttendanceClosingDate>[] {
  return [
    {
      field: "closing_date",
      headerName: "締日",
      width: 150,
      editable: true,
      valueGetter: (params) => {
        const date = dayjs(params.row.closing_date);
        return date.format("YYYY/MM/DD");
      },
    },
    {
      field: "created_at",
      headerName: "作成日",
      width: 150,
      valueGetter: (params) => {
        const date = dayjs(params.row.created_at);
        return date.format("YYYY/MM/DD");
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "操作",
      getActions: (params: GridRowParams<AttendanceClosingDate>) => {
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
            label="削除"
          />,
        ];
      },
    },
  ];
}

function Title() {
  return (
    <Typography
      variant="h4"
      sx={{ pl: 1, borderBottom: "solid 5px #0FA85E", color: "#0FA85E" }}
    >
      締日管理
    </Typography>
  );
}

export default function JobTerm() {
  const { closingDates, loading, createClosingDate } = useClosingDates();

  const [rowModelsModel, setRowModelsModel] = useState<GridRowModesModel>({});

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
    setValue,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(variationSchema),
  });

  const onSubmit = (data: Inputs) => {
    if (!data.closingDate) {
      throw new Error("closingDate is null.");
    }

    void createClosingDate(data.closingDate).then(() => {
      reset();
      setValue("closingDate", null);
    });
  };

  const processRowUpdate: DataGridProps<AttendanceClosingDate>["processRowUpdate"] =
    (newRow) => {
      console.log(newRow);
      return newRow;
    };

  if (loading) return <LinearProgress />;

  return (
    <Stack spacing={2} sx={{ px: 5, pt: 2 }}>
      <Title />
      <Typography>月ごとに勤怠を締める日付を指定します。</Typography>
      <Box>
        <Stack spacing={2}>
          <Box>
            <Controller
              name="closingDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  value={value}
                  format="YYYY/MM/DD"
                  slotProps={{
                    textField: {
                      helperText: errors.closingDate?.message,
                    },
                  }}
                  onChange={(date) => {
                    if (!date) return;
                    onChange(date);
                  }}
                />
              )}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              disabled={!isDirty || !isValid || isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              追加
            </Button>
          </Box>
        </Stack>
      </Box>
      <DataGrid
        rows={closingDates}
        editMode="row"
        rowModesModel={rowModelsModel}
        onRowModesModelChange={(model) => setRowModelsModel(model)}
        processRowUpdate={processRowUpdate}
        sortModel={[
          {
            field: "closing_date",
            sort: "desc",
          },
        ]}
        autoHeight
        columns={getColumns(rowModelsModel)}
      />
    </Stack>
  );
}
