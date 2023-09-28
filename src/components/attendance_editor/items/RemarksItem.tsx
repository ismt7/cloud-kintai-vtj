import { Box, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Attendance } from "../../../client";

export default function RemarksItem({
  attendance,
  callback,
}: {
  attendance: Attendance | null;
  callback: (value: string) => void;
}) {
  if (!attendance) return <></>;

  const [remarks, setRemarks] = useState<string>("");

  useEffect(() => {
    if (!attendance.remarks) return;

    setRemarks(attendance.remarks);
  }, [attendance.remarks]);

  useEffect(() => {
    callback(remarks);
  }, [remarks]);

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
          onChange={(event) => setRemarks(event.target.value)}
        />
      </Box>
    </Stack>
  );
}
