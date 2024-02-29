import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Document() {
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Stack direction="column" spacing={2} sx={{ pt: 2 }}>
        <Outlet />
      </Stack>
    </Container>
  );
}
