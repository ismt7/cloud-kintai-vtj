import { Box, Stack } from "@mui/material";

import StaffForm from "../../components/staff_form/StaffForm";
import StaffList from "../../components/staff_list/StaffList";

function AdminStaff() {
  return (
    <Stack direction="row" sx={{ height: 1 }}>
      <Box sx={{ width: "350px", height: 1 }}>
        <StaffList />
      </Box>
      <Box sx={{ p: 5, flexGrow: 2 }}>
        <StaffForm />
      </Box>
    </Stack>
  );
}
export default AdminStaff;
