import { Box, Checkbox, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatchV2, useAppSelectorV2 } from "../../../app/hooks";
import {
  selectAttendanceEditor,
  updateAttendance,
} from "../attendanceEditorSlice";

export default function ReturnDirectlyItem() {
  const { attendance } = useAppSelectorV2(selectAttendanceEditor);
  const [returnDirectly, setReturnDirectly] = useState<boolean>(
    attendance?.returnDirectlyFlag ?? false
  );

  // attendanceが変更されたら実行される
  useEffect(() => {
    if (!attendance) return;
    setReturnDirectly(attendance?.returnDirectlyFlag ?? false);
  }, [attendance]);

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>直帰</Box>
      <Box>
        <Checkbox
          checked={returnDirectly}
          onChange={() => {
            if (!attendance) return;

            setReturnDirectly(!returnDirectly);

            const dispatch = useAppDispatchV2();
            void dispatch(
              updateAttendance({
                ...attendance,
                returnDirectlyFlag: !returnDirectly,
              })
            );
          }}
        />
      </Box>
    </Stack>
  );
}
