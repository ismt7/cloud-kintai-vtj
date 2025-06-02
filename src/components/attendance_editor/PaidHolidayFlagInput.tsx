import { Box, Checkbox, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dayjs from "dayjs";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

import { AttendanceDateTime } from "@/lib/AttendanceDateTime";

import PaidHolidayFlagInputMobile from "./PaidHolidayFlagInputMobile";

interface PaidHolidayFlagInputProps {
  label?: string;
  disabled?: boolean;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  workDate?: string;
  setPaidHolidayTimes?: boolean;
}

export default function PaidHolidayFlagInput({
  label = "有給休暇",
  disabled = false,
  control,
  setValue,
  workDate,
  setPaidHolidayTimes = false,
}: PaidHolidayFlagInputProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <PaidHolidayFlagInputMobile
        {...{
          label,
          disabled,
          control,
          setValue,
          workDate,
          setPaidHolidayTimes,
        }}
      />
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    setValue("paidHolidayFlag", e.target.checked);
    field.onChange(e);

    if (!e.target.checked || !setPaidHolidayTimes || !workDate) return;

    const workDayjs = dayjs(workDate);
    setValue(
      "startTime",
      new AttendanceDateTime().setDate(workDayjs).setWorkStart().toISOString()
    );
    setValue(
      "endTime",
      new AttendanceDateTime().setDate(workDayjs).setWorkEnd().toISOString()
    );
    setValue("rests", [
      {
        startTime: new AttendanceDateTime()
          .setDate(workDayjs)
          .setRestStart()
          .toISOString(),
        endTime: new AttendanceDateTime()
          .setDate(workDayjs)
          .setRestEnd()
          .toISOString(),
      },
    ]);
  };

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>{label}</Box>
      <Box>
        <Controller
          name="paidHolidayFlag"
          control={control}
          disabled={disabled}
          render={({ field }) => (
            <Checkbox
              {...field}
              checked={field.value || false}
              onChange={(e) => handleChange(e, field)}
            />
          )}
        />
      </Box>
    </Stack>
  );
}
