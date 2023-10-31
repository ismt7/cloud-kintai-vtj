import { Box, Stack, Typography } from "@mui/material";
import Title from "../../components/Title/Title";

export default function StartDocument() {
  return (
    <Stack spacing={2}>
      <Box>
        <Title text="はじめに" />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">ここにコンテンツが表示されます</Typography>
      </Box>
    </Stack>
  );
}
