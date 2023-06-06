import { Box } from "@mui/material";

import TimeRecorder from "../components/time_recorder/TimeRecorder";

function Register() {
  return (
    <Box sx={{ height: 1, py: 10, justifyContent: "center", display: "flex" }}>
      <TimeRecorder />
    </Box>
  );
}
export default Register;
