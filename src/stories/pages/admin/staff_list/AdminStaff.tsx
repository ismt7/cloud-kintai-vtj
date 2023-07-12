import { Box, Stack } from "@mui/material";
import { Provider } from "react-redux";

import { store } from "../../../../app/store";
import Footer from "../../../../components/footer/Footer";
import Header from "../../../../components/header/Header";
import StaffForm from "../../../../components/staff_form/StaffForm";
import StaffList from "../../../../components/staff_list/StaffList";

const AdminStaff = () => (
  <Provider store={store}>
    <Stack sx={{ height: "100vh" }}>
      <Box>
        <Header />
      </Box>
      <Box sx={{ height: 1 }}>
        <Stack direction="row" sx={{ height: 1 }}>
          <Box sx={{ width: "350px", height: 1 }}>
            <StaffList />
          </Box>
          <Box sx={{ p: 5, flexGrow: 2 }}>
            <StaffForm />
          </Box>
        </Stack>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Stack>
  </Provider>
);
export default AdminStaff;
