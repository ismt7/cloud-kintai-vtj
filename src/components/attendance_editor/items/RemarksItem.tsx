import { Box, Stack, TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { AttendanceEditorInputs } from "../common";

export default function RemarksItem({
  register,
}: {
  register: UseFormRegister<AttendanceEditorInputs>;
}) {
  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>備考</Box>
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
