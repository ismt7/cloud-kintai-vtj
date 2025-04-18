import { Box, Alert, Container } from "@mui/material";

import TimeRecorder from "../components/time_recorder/TimeRecorder";

export default function Register() {
  const isRegisterDisabled =
    import.meta.env.VITE_STANDARD_REGISTER_DISABLE === "true";

  if (isRegisterDisabled) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Alert severity="warning">現在、こちらの機能は使用できません</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        height: 1,
        py: {
          xs: 2,
          md: 10,
        },
        justifyContent: "center",
        display: "flex",
      }}
    >
      <TimeRecorder />
    </Box>
  );
}
