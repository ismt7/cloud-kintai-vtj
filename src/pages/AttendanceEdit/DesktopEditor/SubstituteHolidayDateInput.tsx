import { Stack, styled, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext } from "react";
import { Controller } from "react-hook-form";

import { AttendanceEditContext } from "../AttendanceEditProvider";

const Label = styled(Typography)(() => ({
  width: "150px",
  fontWeight: "bold",
}));

export function SubstituteHolidayDateInput() {
  const { control } = useContext(AttendanceEditContext);
  return (
    <Stack direction="row" spacing={0} alignItems={"center"}>
      <Label variant="body1">振替休日</Label>
      <Controller
        name="substituteHolidayDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            label="勤務した日"
            format="YYYY/MM/DD"
            slotProps={{
              textField: { size: "small" },
            }}
          />
        )}
      />
    </Stack>
  );
}
