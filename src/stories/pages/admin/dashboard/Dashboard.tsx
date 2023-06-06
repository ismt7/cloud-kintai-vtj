import { Box, Stack } from "@mui/material";
import { Provider } from "react-redux";

import Footer from "../../../../components/footer/Footer";
import Header from "../../../../components/header/Header";
import Menu from "../../../../components/menu/Menu";
import { store } from "../../../../lib/store";

const Dashboard = () => (
  <Provider store={store}>
    <Stack sx={{ height: "100vh" }}>
      <Box>
        <Header />
      </Box>
      <Box sx={{ height: 1, px: 5 }}>
        <Stack>
          <Box sx={{ height: "50px" }}>
            <Menu />
          </Box>
        </Stack>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Stack>
  </Provider>
);
export default Dashboard;
