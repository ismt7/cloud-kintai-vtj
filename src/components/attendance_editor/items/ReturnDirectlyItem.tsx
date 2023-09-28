import { Box, Checkbox, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Attendance } from "../../../client";

export default function ReturnDirectlyItem({
  attendance,
  callback,
}: {
  attendance: Attendance | null;
  callback: (value: boolean) => void;
}) {
  if (!attendance) return <></>;

  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(attendance.return_directly_flag || false);
  }, [attendance.return_directly_flag]);

  useEffect(() => {
    callback(checked);
  }, [checked]);

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>直帰</Box>
      <Box>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
      </Box>
    </Stack>
  );
}
