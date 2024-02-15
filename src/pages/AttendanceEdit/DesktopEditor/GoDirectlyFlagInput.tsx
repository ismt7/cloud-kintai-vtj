import { Checkbox, Stack, styled, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";

import { AttendanceEditInputs } from "../common";

const Label = styled(Typography)(() => ({
  width: "150px",
  fontWeight: "bold",
}));

export default function GoDirectlyFlagInput({
  control,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
}) {
  return (
    <Stack direction="row" alignItems={"center"}>
      <Label variant="body1" sx={{ fontWeight: "bold", width: "150px" }}>
        直行
      </Label>
      <Controller
        name="goDirectlyFlag"
        control={control}
        render={({ field }) => (
          <Checkbox checked={field.value || false} {...field} />
        )}
      />
    </Stack>
  );
}
