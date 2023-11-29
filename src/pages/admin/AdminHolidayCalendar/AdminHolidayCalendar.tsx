import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as xlsx from "xlsx";
import {
  CreateCompanyHolidayCalendarInput,
  CreateHolidayCalendarInput,
} from "../../../API";
import { useAppDispatchV2 } from "../../../app/hooks";
import { E07001, E08001, S07001, S08001 } from "../../../errors";
import useCompanyHolidayCalendars from "../../../hooks/useCompanyHolidayCalendars/useCompanyHolidayCalendars";
import useHolidayCalendar from "../../../hooks/useHolidayCalendars/useHolidayCalendars";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../../lib/reducers/snackbarReducer";
import company_holiday from "../../../templates/company_holiday.xlsx";
import HolidayCalendarListGroup from "./HolidayCalendarListGroup";

function Title() {
  return (
    <Typography
      variant="h4"
      sx={{ pl: 1, borderBottom: "solid 5px #0FA85E", color: "#0FA85E" }}
    >
      休日カレンダー管理
    </Typography>
  );
}

function CSVFilePicker({
  onSubmit,
}: {
  onSubmit: (data: CreateHolidayCalendarInput[]) => void;
}) {
  const [name, setName] = useState<string | undefined>();

  return (
    <Box>
      <Button component="label" variant="contained">
        ファイルを選択
        <input
          type="file"
          hidden
          accept=".csv"
          onChange={(event) => {
            // ファイル名を設定
            const file = event.target.files?.item(0);
            if (!file) return;

            setName(file.name);

            const reader = new FileReader();
            reader.readAsText(file, "Shift_JIS");
            reader.onload = () => {
              const csv = reader.result as string;
              const lines = csv.split("\r\n");
              const data = lines.map((line) => line.split(","));

              const requestHolidayCalendars = data
                .slice(1)
                .filter((row) => row[0] !== "")
                .filter((row) => dayjs(row[0]).isAfter("2023/01/01"))
                .map(
                  (row) =>
                    ({
                      holidayDate: dayjs(row[0]).format("YYYY-MM-DD"),
                      name: String(row[1]),
                    } as CreateHolidayCalendarInput)
                );

              const result = window.confirm(
                `以下の${requestHolidayCalendars.length}件のデータを登録しますか？`
              );
              if (!result) return;

              onSubmit(requestHolidayCalendars);
            };
          }}
        />
      </Button>
      <Typography>{name}</Typography>
    </Box>
  );
}

function ExcelFilePicker({
  onSubmit,
}: {
  onSubmit: (data: CreateCompanyHolidayCalendarInput[]) => void;
}) {
  const [file, setFile] = useState<File | undefined>();

  return (
    <Box>
      <Button component="label" variant="contained">
        ファイルを選択
        <input
          type="file"
          hidden
          accept=".xlsx"
          onChange={(event) => {
            const uploadFile = event.target.files?.item(0);
            if (!uploadFile) return;

            setFile(uploadFile);

            const reader = new FileReader();
            reader.readAsArrayBuffer(uploadFile);
            reader.onload = (e) => {
              if (!e.target?.result) return;

              const data = new Uint8Array(e.target.result as ArrayBuffer);
              const workbook = xlsx.read(data, { type: "array" });
              const csv = xlsx.utils.sheet_to_csv(workbook.Sheets.Sheet1);
              const lines = csv.split("\n").map((line) => line.split(","));
              const requestCompanyHolidayCalendars = lines
                .slice(1)
                .map((row) => ({
                  holidayDate: dayjs(row[0]).format("YYYY-MM-DD"),
                  name: String(row[1]),
                }));

              const result = window.confirm(
                `以下の${requestCompanyHolidayCalendars.length}件のデータを登録しますか？`
              );
              if (!result) return;

              onSubmit(requestCompanyHolidayCalendars);
            };
          }}
        />
      </Button>
      <Typography>{file?.name}</Typography>
    </Box>
  );
}

export default function AdminHolidayCalendar() {
  const dispatch = useAppDispatchV2();
  const { route } = useAuthenticator();
  const navigate = useNavigate();
  const {
    holidayCalendars,
    loading: holidayCalendarLoading,
    error: holidayCalendarError,
    bulkCreateHolidayCalendar,
  } = useHolidayCalendar();
  const {
    companyHolidayCalendars,
    loading: companyHolidayCalendarLoading,
    error: companyHolidayCalendarError,
    createCompanyHolidayCalendar,
    updateCompanyHolidayCalendar,
    deleteCompanyHolidayCalendar,
    bulkCreateCompanyHolidayCalendar,
  } = useCompanyHolidayCalendars();

  useEffect(() => {
    if (route !== "idle" && route !== "authenticated") {
      navigate("/login");
    }
  }, [route]);

  if (holidayCalendarLoading || companyHolidayCalendarLoading) {
    return <LinearProgress />;
  }

  if (holidayCalendarError || companyHolidayCalendarError) {
    alert("データ取得中に問題が発生しました。管理者にお問い合わせください。");
    return null;
  }

  return (
    <Stack spacing={2}>
      <Title />
      <Table sx={{ maxWidth: 600 }}>
        <TableBody>
          <TableRow>
            <TableCell rowSpan={3}>休日カレンダー</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>法定休日</TableCell>
            <TableCell>
              <CSVFilePicker
                onSubmit={(data) => {
                  bulkCreateHolidayCalendar(data)
                    .then(() => dispatch(setSnackbarSuccess(S07001)))
                    .catch(() => dispatch(setSnackbarError(E07001)));
                }}
              />
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>所定休日</TableCell>
            <TableCell>
              <ExcelFilePicker
                onSubmit={(data) => {
                  bulkCreateCompanyHolidayCalendar(data)
                    .then(() => dispatch(setSnackbarSuccess(S08001)))
                    .catch(() => dispatch(setSnackbarError(E08001)));
                }}
              />
            </TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  const a = document.createElement("a");
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  a.href = company_holiday;
                  a.download = "company_holiday.xlsx";
                  a.click();
                }}
              >
                テンプレート
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box>
        <HolidayCalendarListGroup
          holidayCalendars={holidayCalendars}
          companyHolidayCalendars={companyHolidayCalendars}
          createCompanyHolidayCalendar={createCompanyHolidayCalendar}
          updateCompanyHolidayCalendar={updateCompanyHolidayCalendar}
          deleteCompanyHolidayCalendar={deleteCompanyHolidayCalendar}
        />
      </Box>
    </Stack>
  );
}
