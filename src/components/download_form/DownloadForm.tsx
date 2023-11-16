import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Service, Staff } from "../../client";
import { LoginStaff } from "../staff_list/StaffList";

interface FormState {
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  aggregateMonth: number;
}

async function fetchStaffs(
  loginStaff: LoginStaff,
  callback: (value: Staff[]) => void
) {
  if (!loginStaff) return;

  const staffs = await Service.getStaffs(loginStaff.id).catch((error) => {
    console.log(error);
    return [] as Staff[];
  });

  callback(staffs);
}

interface AggregateMonth {
  id: number;
  date: dayjs.Dayjs;
}

const initialState: FormState = {
  startDate: null,
  endDate: null,
  aggregateMonth: dayjs().month(),
};

const DownloadForm = ({ loginStaff }: { loginStaff: LoginStaff }) => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [staffs, setStaffs] = useState<Staff[]>([]);

  const aggregateMonthList = [...Array<number>(12)].map(
    (_, i) =>
      ({
        id: i,
        date: dayjs().month(i),
      } as AggregateMonth)
  );

  useEffect(() => {
    if (!loginStaff) return;

    void fetchStaffs(loginStaff, (value) => setStaffs(value));
  }, [loginStaff]);

  function changeHandler<T>(key: string, value: T) {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  const handleBulkDownload = () => {
    // 処理なし
  };

  return (
    <Stack
      spacing={4}
      alignItems="center"
      sx={{
        border: 1,
        borderColor: "primary.main",
        borderRadius: "5px",
        pb: 3,
      }}
    >
      <Box
        sx={{
          p: 1,
          width: 1,
          boxSizing: "border-box",
          textAlign: "center",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          borderRadius: "3px 3px 0 0",
        }}
      >
        ダウンロードオプション
      </Box>
      <Box>
        <Stack
          spacing={3}
          sx={{ display: "inline-block", boxSizing: "border-box" }}
        >
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box>
                <DesktopDatePicker
                  label="開始日"
                  format="YYYY/MM/DD"
                  value={formState.startDate}
                  onChange={(event) => changeHandler("startDate", event)}
                  slotProps={{ textField: { variant: "outlined" } }}
                />
              </Box>
              <Box>〜</Box>
              <Box>
                <DesktopDatePicker
                  label="終了日"
                  format="YYYY/MM/DD"
                  value={formState.endDate}
                  onChange={(event) => changeHandler("endDate", event)}
                  slotProps={{ textField: { variant: "outlined" } }}
                />
              </Box>
            </Stack>
          </Box>
          <Box>
            <Autocomplete
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={aggregateMonthList}
              getOptionLabel={(option) => `${option.date.format("YYYY年MM月")}`}
              defaultValue={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="集計対象月"
                  placeholder="集計対象月を選択..."
                />
              )}
              sx={{ width: "500px" }}
            />
          </Box>
          <Box>
            <Autocomplete
              data-testid="autocomplete"
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={staffs}
              getOptionLabel={(option) =>
                `${option?.last_name || ""} ${option?.first_name || ""}`
              }
              defaultValue={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="対象者"
                  placeholder="対象者を入力..."
                />
              )}
              sx={{ width: "500px" }}
            />
          </Box>
        </Stack>
      </Box>
      <Box>
        <Button onClick={handleBulkDownload}>一括ダウンロード</Button>
      </Box>
    </Stack>
  );
};
export default DownloadForm;
