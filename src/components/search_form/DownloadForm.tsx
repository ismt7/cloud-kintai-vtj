import { useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

import { Staff } from "../../api";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import fetchStaffList from "../../lib/staff/FetchStaffList";
import { selectStaffList } from "../../lib/store";
import Button from "../button/Button";

const DownloadForm = () => {
  const staffs = useAppSelector(selectStaffList);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs("2023-01-01"));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs("2023-01-31"));
  const [aggregateMonth, setAggregateMonth] = useState(202301);
  const [targetStaffs, setTargetStaffs] = useState<Staff[]>([]);
  const dispatch = useAppDispatch();

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDate(newValue);
  };

  const handleAggregateMonthChange = (event: SelectChangeEvent<number>) => {
    setAggregateMonth(event.target.value as number);
  };

  const handleBulkDownload = () => {
    // console.log("bulk download");
  };

  useEffect(() => {
    void dispatch(fetchStaffList());
  }, []);

  useEffect(() => {
    setTargetStaffs(staffs.data);
  }, [staffs]);

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack
            spacing={3}
            sx={{ display: "inline-block", boxSizing: "border-box" }}
          >
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box>
                  <DesktopDatePicker
                    label="開始日"
                    inputFormat="YYYY/MM/DD"
                    value={startDate}
                    onChange={handleStartDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
                <Box>〜</Box>
                <Box>
                  <DesktopDatePicker
                    label="終了日"
                    inputFormat="YYYY/MM/DD"
                    value={endDate}
                    onChange={handleEndDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </Stack>
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  集計対象月
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={aggregateMonth}
                  label="集計対象月"
                  onChange={handleAggregateMonthChange}
                >
                  <MenuItem value={202301}>2023/01</MenuItem>
                  <MenuItem value={202302}>2023/02</MenuItem>
                  <MenuItem value={202303}>2023/03</MenuItem>
                  <MenuItem value={202304}>2023/04</MenuItem>
                  <MenuItem value={202305}>2023/05</MenuItem>
                  <MenuItem value={202306}>2023/06</MenuItem>
                  <MenuItem value={202307}>2023/07</MenuItem>
                  <MenuItem value={202308}>2023/08</MenuItem>
                  <MenuItem value={202309}>2023/09</MenuItem>
                  <MenuItem value={202310}>2023/10</MenuItem>
                  <MenuItem value={202311}>2023/11</MenuItem>
                  <MenuItem value={202312}>2023/12</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={targetStaffs}
                getOptionLabel={(option) =>
                  `${option.lastName} ${option.firstName}`
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
        </LocalizationProvider>
      </Box>
      <Box>
        <Button label="一括ダウンロード" onClick={handleBulkDownload} />
      </Box>
    </Stack>
  );
};
export default DownloadForm;
