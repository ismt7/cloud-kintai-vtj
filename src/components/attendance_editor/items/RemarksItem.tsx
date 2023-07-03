import { Box, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function RemarksItem() {
  const [remarks, setRemarks] = useState<string>("");

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>備考</Box>
      <Box sx={{ flexGrow: 2 }}>
        <TextField
          multiline
          minRows={2}
          fullWidth
          value={remarks}
          placeholder="備考欄：客先名やイベント名などを記載"
          sx={{ width: 1 }}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </Box>
    </Stack>
  );
}
