import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useCloseDates from "../../hooks/useCloseDates/useCloseDates";
import useStaffs, { StaffType } from "../../hooks/useStaffs/useStaffs";
import { calcTotalRestTime } from "../attendance_editor/items/RestTimeItem/RestTimeItem";
import downloadAttendances from "./downloadAttendances";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Inputs = {
  startDate: dayjs.Dayjs | undefined;
  endDate: dayjs.Dayjs | undefined;
  staffs: StaffType[];
};

const defaultValues: Inputs = {
  startDate: undefined,
  endDate: undefined,
  staffs: [],
};

export default function DownloadForm() {
  const navigate = useNavigate();
  const [selectedStaff, setSelectedStaff] = useState<StaffType[]>([]);
  const { staffs, loading: staffLoading, error: staffError } = useStaffs();
  const {
    closeDates,
    loading: closeDateLoading,
    error: closeDateError,
  } = useCloseDates();

  const { control, handleSubmit, setValue } = useForm<Inputs>({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async (data: Inputs) => {
    const startDate = data.startDate ? data.startDate : dayjs();
    const endDate = data.endDate ? data.endDate : dayjs();

    const workDates: string[] = [];
    let date = startDate;
    while (date.isBefore(endDate) || date.isSame(endDate)) {
      workDates.push(date.format("YYYY-MM-DD"));
      date = date.add(1, "day");
    }

    await downloadAttendances(
      workDates.map((workDate) => ({
        workDate: {
          eq: workDate,
        },
      }))
    ).then((res) => {
      const exportData = [
        "営業日,従業員コード,名前,休憩時間,出勤打刻,退勤打刻,直行,直帰,有給休暇,摘要",
        ...selectedStaff.map((staff) => {
          const attendances = res.filter(
            (attendance) => attendance.staffId === staff.cognitoUserId
          );

          return [
            ...workDates.map((workDate) => {
              const matchAttendance = attendances.find(
                (attendance) => attendance.workDate === workDate
              );

              if (matchAttendance) {
                const {
                  staffId,
                  startTime,
                  endTime,
                  goDirectlyFlag,
                  returnDirectlyFlag,
                  paidHolidayFlag,
                  rests,
                  remarks,
                } = matchAttendance;

                const totalRestTime =
                  rests?.reduce((acc, rest) => {
                    if (!rest) return acc;

                    const diff = calcTotalRestTime(
                      rest.startTime,
                      rest.endTime
                    );
                    return acc + diff;
                  }, 0) ?? 0;

                return [
                  dayjs(workDate).format("YYYY/MM/DD"),
                  staffId,
                  `${staff.familyName} ${staff.givenName}`,
                  totalRestTime.toFixed(2),
                  startTime ? dayjs(startTime).format("HH:mm") : "",
                  endTime ? dayjs(endTime).format("HH:mm") : "",
                  goDirectlyFlag ? 1 : 0,
                  returnDirectlyFlag ? 1 : 0,
                  paidHolidayFlag ? 1 : 0,
                  remarks,
                ].join(",");
              }

              return [
                dayjs(workDate).format("YYYY/MM/DD"),
                staff.cognitoUserId,
                `${staff.familyName} ${staff.givenName}`,
                "",
                "",
                "",
                "",
                "",
                "",
                "",
              ].join(",");
            }),
          ].join("\n");
        }),
      ].join("\n");

      // CSVファイルを作成してダウンロード
      const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
      const blob = new Blob([bom, exportData], {
        type: "text/csv",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = `attendances_${dayjs().format("YYYYMMDD")}.csv`;
      a.href = url;
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
  };

  if (staffLoading || closeDateLoading) {
    return <CircularProgress />;
  }

  if (staffError || closeDateError) {
    return <div>エラーが発生しました</div>;
  }

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
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="開始日"
                        format="YYYY/MM/DD"
                        slotProps={{
                          textField: { variant: "outlined", size: "small" },
                        }}
                      />
                    )}
                  />
                </Box>
                <Box>〜</Box>
                <Box>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="終了日"
                        format="YYYY/MM/DD"
                        slotProps={{
                          textField: { variant: "outlined", size: "small" },
                        }}
                      />
                    )}
                  />
                </Box>
              </Stack>
              <Stack spacing={2} sx={{ maxWidth: 500, overflowX: "auto" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ whiteSpace: "nowrap" }}>集計対象月から:</Box>
                  <Chip
                    icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
                    label="新規"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      navigate("/admin/master/job_term");
                    }}
                  />
                  {closeDates.map((closeDate, index) => (
                    <Chip
                      key={index}
                      label={dayjs(closeDate.closeDate).format("YYYY/MM")}
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setValue("startDate", dayjs(closeDate.startDate));
                        setValue("endDate", dayjs(closeDate.endDate));
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Box>
            <Controller
              name="staffs"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={selectedStaff}
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={staffs}
                  disableCloseOnSelect
                  getOptionLabel={(option) =>
                    `${option?.familyName || ""} ${option?.givenName || ""}`
                  }
                  defaultValue={[]}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {`${option?.familyName || ""} ${option?.givenName || ""}`}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="対象者"
                      placeholder="対象者を入力..."
                      size="small"
                    />
                  )}
                  sx={{ width: "500px" }}
                  onChange={(_, value) => {
                    setSelectedStaff(value);
                    setValue("staffs", value);
                  }}
                />
              )}
            />
          </Box>
        </Stack>
      </Box>
      <Box>
        <Button onClick={handleSubmit(onSubmit)}>一括ダウンロード</Button>
      </Box>
    </Stack>
  );
}
