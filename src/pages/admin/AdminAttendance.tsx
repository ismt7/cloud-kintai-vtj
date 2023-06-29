import { Box, Stack } from "@mui/material";

import DownloadForm from "../../components/download_form/DownloadForm";

export default function AdminAttendance() {
  return (
    <Stack direction="column" sx={{ height: 1, p: 2 }}>
      <Box>
        <DownloadForm />
      </Box>
      <Box sx={{ flexGrow: 2 }}>aaaaa</Box>
    </Stack>
  );
}
