import { Checkbox, Stack, styled, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";

import { AttendanceEditInputs } from "../common";

const Label = styled(Typography)(() => ({
  width: "150px",
  fontWeight: "bold",
}));

export default function PaidHolidayFlagInput({
  control,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
}) {
  return (
    <Stack direction="row" alignItems={"center"}>
      <Label variant="body1">有給休暇</Label>
      <Controller
        name="paidHolidayFlag"
        control={control}
        render={({ field }) => (
          <Checkbox checked={field.value || false} {...field} />
        )}
      />
    </Stack>
  );
}
