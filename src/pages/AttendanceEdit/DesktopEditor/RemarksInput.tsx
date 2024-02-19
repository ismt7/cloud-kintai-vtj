import { Box, Stack, styled, TextField, Typography } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

import { AttendanceEditInputs } from "../common";

const Label = styled(Typography)(() => ({
  width: "150px",
  fontWeight: "bold",
}));

export default function RemarksInput({
  register,
}: {
  register: UseFormRegister<AttendanceEditInputs>;
}) {
  return (
    <Stack direction="row" alignItems={"center"}>
      <Label>備考</Label>
      <Box sx={{ flexGrow: 2 }}>
        <TextField
          multiline
          minRows={2}
          fullWidth
          placeholder="備考欄：客先名やイベント名などを記載"
          sx={{ width: 1 }}
          {...register("remarks")}
        />
      </Box>
    </Stack>
  );
}
