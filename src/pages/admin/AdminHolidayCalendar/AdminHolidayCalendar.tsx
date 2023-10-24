import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  Box,
  Button,
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
import { HolidayCalendar } from "../../../client";
import { LoginStaff } from "../../../components/staff_list/StaffList";
import company_holiday from "../../../templates/company_holiday.xlsx";
import HolidayCalendarListGroup from "./HolidayCalendarListGroup";
import useCompanyHolidayCalendars from "./hooks/useCompanyHolidayCalendars";
import useHolidayCalendars from "./hooks/useHolidayCalendar";
import useLoginStaff from "./hooks/useLoginStaff";

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

function CSVFilePicker({ loginStaff }: { loginStaff: LoginStaff }) {
  const { createHolidayCalendars } = useHolidayCalendars(loginStaff);

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
                      holiday_date: dayjs(row[0]).format("YYYY-MM-DD"),
                      name: String(row[1]),
                    } as HolidayCalendar)
                );

              void createHolidayCalendars(requestHolidayCalendars);
            };
          }}
        />
      </Button>
      <Typography>{name}</Typography>
    </Box>
  );
}

function ExcelFilePicker({ loginStaff }: { loginStaff: LoginStaff }) {
  const { createCompanyHolidayCalendars } =
    useCompanyHolidayCalendars(loginStaff);

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

              void createCompanyHolidayCalendars(
                lines.slice(1).map((row) => ({
                  name: String(row[1]),
                  holiday_date: dayjs(row[0]).format("YYYY-MM-DD"),
                }))
              );
            };
          }}
        />
      </Button>
      <Typography>{file?.name}</Typography>
    </Box>
  );
}

function AdminHolidayCalendar() {
  const { route, user } = useAuthenticator();
  const { loginStaff } = useLoginStaff(user?.attributes?.sub);
  const navigate = useNavigate();

  useEffect(() => {
    if (route !== "idle" && route !== "authenticated") {
      navigate("/login");
    }
  }, [route]);

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
              <CSVFilePicker loginStaff={loginStaff} />
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>所定休日</TableCell>
            <TableCell>
              <ExcelFilePicker loginStaff={loginStaff} />
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
        <HolidayCalendarListGroup />
      </Box>
    </Stack>
  );
}

export default AdminHolidayCalendar;
