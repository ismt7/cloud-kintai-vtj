import { Breadcrumbs, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminStaffEditor() {
  return (
    <Container maxWidth="xl" sx={{ height: 1, pt: 2 }}>
      <Stack spacing={2}>
        <Breadcrumbs>
          <Link to="/" color="inherit">
            TOP
          </Link>
          <Link to="/admin/staff" color="inherit">
            スタッフ一覧
          </Link>
          <Typography color="text.primary">{"{{スタッフ名}}"}</Typography>
          <Typography color="text.primary">編集</Typography>
        </Breadcrumbs>
      </Stack>
    </Container>
  );
}
