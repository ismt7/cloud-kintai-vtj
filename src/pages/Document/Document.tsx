import { Box, Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Document() {
  return (
    <Container maxWidth="xl">
      <Stack spacing={2}>
        <Box>
          <Outlet />
        </Box>
      </Stack>
    </Container>
  );
}
