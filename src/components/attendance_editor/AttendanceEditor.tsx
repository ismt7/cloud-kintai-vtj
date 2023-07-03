import { Box, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Button from "../button/Button";
import GoDirectlyItem from "./items/GoDirectlyItem";
import ProductionTimeItem from "./items/ProductionTimeItem";
import ReasonRevisionItem from "./items/ReasonRevisionItem";
import RemarksItem from "./items/RemarksItem";
import RestTimeItem from "./items/RestTimeItem";
import ReturnDirectlyItem from "./items/ReturnDirectlyItem";
import StaffNameItem from "./items/StaffNameItem";
import WorkDateItem from "./items/WorkDateItem";
import WorkTimeItem from "./items/WorkTimeItem";

export default function AttendanceEditor() {
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
          <hr />
        </Box>
        <Box>
          <ProductionTimeItem />
        </Box>
        <Box>
          <ReasonRevisionItem />
        </Box>
        <Box>
          <RemarksItem />
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
