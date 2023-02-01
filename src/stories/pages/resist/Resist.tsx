import { Box, Stack } from "@mui/material";
import { Provider } from "react-redux";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import TimeRecorder from "../../../components/time_recorder/TimeRecorder";
import { store } from "../../../lib/store";

const Resist: React.FC = () => (
  <Provider store={store}>
    <Stack sx={{ height: "100vh" }}>
      <Box>
        <Header />
      </Box>
      <Box
        sx={{ height: 1, py: 10, justifyContent: "center", display: "flex" }}
      >
        <TimeRecorder />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Stack>
  </Provider>
);
export default Resist;
