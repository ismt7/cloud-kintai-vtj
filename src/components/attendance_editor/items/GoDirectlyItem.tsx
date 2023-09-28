import { Box, Checkbox, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Attendance } from "../../../client";

export default function GoDirectlyItem({
  attendance,
  callback,
}: {
  attendance: Attendance | null;
  callback: (value: boolean) => void;
}) {
  if (!attendance) return <></>;

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(attendance.go_directly_flag || false);
  }, [attendance.go_directly_flag]);

  useEffect(() => {
    callback(checked);
  }, [checked]);

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>直行</Box>
      <Box>
        <Checkbox
          checked={checked}
          onChange={() => {
            if (!attendance) return;
            setChecked(!checked);
          }}
        />
      </Box>
    </Stack>
  );
}
