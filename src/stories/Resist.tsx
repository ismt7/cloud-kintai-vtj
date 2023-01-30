import { Box, Stack } from "@mui/material";
import Footer from "../components/footer/Footer";
import TimeRecorder from "../components/time_recorder/TimeRecorder";
import Header from "./Header";

const Resist: React.FC = () => (
  <Stack sx={{ height: "100vh" }}>
    <Box>
      <Header />
    </Box>
    <Box sx={{ height: 1, py: 10, justifyContent: "center", display: "flex" }}>
      <TimeRecorder
        clockInOnClick={() => {}}
        clockOutOnClick={() => {}}
        restStartOnClick={() => {}}
        restEndOnClick={() => {}}
        goDirectOnClick={() => {}}
        returnDirectOnClick={() => {}}
      />
    </Box>
    <Box>
      <Footer />
    </Box>
  </Stack>
);
export default Resist;
