import { Box, Checkbox, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatchV2, useAppSelectorV2 } from "../../../app/hooks";
import { selectAttendanceEditor } from "../attendanceEditorSlice";
import { updateAttendance } from "../mocks/MockReducer";

export default function GoDirectlyItem() {
  const { attendance } = useAppSelectorV2(selectAttendanceEditor);
  const [goDirectly, setGoDirectly] = useState<boolean>(
    attendance?.goDirectlyFlag ?? false
  );

  useEffect(() => {
    if (!attendance) return;

    setGoDirectly(attendance?.goDirectlyFlag ?? false);
  }, [attendance]);

  return (
    <Stack direction="row" alignItems={"center"}>
      <Box sx={{ fontWeight: "bold", width: "150px" }}>直行</Box>
      <Box>
        <Checkbox
          checked={goDirectly}
          onChange={() => {
            if (!attendance) return;

            setGoDirectly(!goDirectly);

            const dispatch = useAppDispatchV2();
            void dispatch(
              updateAttendance({
                ...attendance,
                goDirectlyFlag: !goDirectly,
              })
            );
          }}
        />
      </Box>
    </Stack>
  );
}
