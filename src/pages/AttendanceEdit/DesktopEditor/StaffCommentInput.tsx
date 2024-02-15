import { Box, Stack, styled, TextField, Typography } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

import { AttendanceEditInputs } from "../common";

const Label = styled(Typography)(() => ({
  width: "150px",
  fontWeight: "bold",
}));

export default function StaffCommentInput({
  register,
}: {
  register: UseFormRegister<AttendanceEditInputs>;
}) {
  return (
    <Stack direction="row" alignItems={"center"}>
      <Label>コメント</Label>
      <Box sx={{ flexGrow: 2 }}>
        <TextField
          {...register("staffComment")}
          multiline
          fullWidth
          minRows={2}
          placeholder="コメント欄：管理者へ伝えたいことを記載(修正理由など)"
        />
      </Box>
    </Stack>
  );
}
