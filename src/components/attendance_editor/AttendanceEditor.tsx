import { Box, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatchV2 } from "../../app/hooks";
import Button from "../button/Button";
import {
  fetchAttendance,
  fetchRests,
  fetchStaff,
} from "./attendanceEditorSlice";
import GoDirectlyItem from "./items/GoDirectlyItem";
import ProductionTimeItem from "./items/ProductionTimeItem";
import ReasonRemarksItem from "./items/ReasonRemarksItem";
import ReasonRevisionItem from "./items/ReasonRevisionItem";
import RemarksItem from "./items/RemarksItem";
import RestTimeItem from "./items/RestTimeItem";
import ReturnDirectlyItem from "./items/ReturnDirectlyItem";
import SeparatorItem from "./items/SeparatorItem";
import StaffNameItem from "./items/StaffNameItem";
import WorkDateItem from "./items/WorkDateItem";
import WorkTimeItem from "./items/WorkTimeItem";

export default function AttendanceEditor() {
  const dispatch = useAppDispatchV2();
  const { targetWorkDate, targetStaffId } = useParams();
  useEffect(() => {
    void dispatch(
      fetchStaff({
        staffId: Number(targetStaffId),
      })
    );

    void dispatch(
      fetchAttendance({
        staffId: Number(targetStaffId),
        workDate: Number(targetWorkDate),
      })
    );

    void dispatch(
      fetchRests({
        staffId: Number(targetStaffId),
        workDate: Number(targetWorkDate),
      })
    );
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2}>
        <Box>
          <StaffNameItem />
        </Box>
        <Box>
          <WorkDateItem />
        </Box>
        <Box>
          <GoDirectlyItem />
        </Box>
        <Box>
          <ReturnDirectlyItem />
        </Box>
        <Box>
          <WorkTimeItem />
        </Box>
        <Box>
          <RestTimeItem />
        </Box>
        <Box>
          <SeparatorItem />
        </Box>
        <Box>
          <ProductionTimeItem />
        </Box>
        <Box>
          <RemarksItem />
        </Box>
        <Box>
          <hr />
        </Box>
        <Box>
          <ReasonRevisionItem />
        </Box>
        <Box>
          <ReasonRemarksItem />
        </Box>
        <Box>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"center"}
            spacing={3}
          >
            <Box>
              <Button
                color="cancel"
                label="キャンセル"
                onClick={() => {}}
                variant="text"
              />
            </Box>
            <Box>
              <Button label="変更" width="150px" />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </LocalizationProvider>
  );
}
