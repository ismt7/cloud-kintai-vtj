import { Box, Stack } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import Footer from "../../../../components/footer/Footer";
import Header from "../../../../components/header/Header";
import AdminMaster from "../../../../pages/admin/AdminMaster";

export default function AdminMasterPage() {
  return (
    <Provider store={store}>
      <Stack sx={{ height: "100vh" }}>
        <Box>
          <Header />
        </Box>
        <Box sx={{ flexGrow: 2 }}>
          <AdminMaster />
        </Box>
        <Box>
          <Footer />
        </Box>
      </Stack>
    </Provider>
  );
}
