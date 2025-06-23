import { Box, Container, ListItemButton, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import CommonBreadcrumbs from "@/components/common/CommonBreadcrumbs";

export default function AdminMasterLayout() {
  const navigate = useNavigate();

  const menuList = [
    {
      name: "集計対象月",
      path: "/admin/master/job_term",
    },
    {
      name: "休日カレンダー",
      path: "/admin/master/holiday_calendar",
    },
    {
      name: "設定",
      path: "/admin/master/feature_management",
    },
  ];

  const menuBoxList = menuList.map((item, index) => (
    <Box key={index}>
      <ListItemButton
        sx={{ p: 2 }}
        onClick={() => {
          navigate(item.path);
        }}
      >
        {item.name}
      </ListItemButton>
    </Box>
  ));

  return (
    <Container maxWidth="xl">
      <Stack direction="row" sx={{ height: 1, pt: 2 }}>
        <Box>
          <Stack sx={{ height: 1 }}>{menuBoxList}</Stack>
        </Box>
        <Box sx={{ flexGrow: 2 }}>
          <Stack spacing={1} sx={{ px: 5 }}>
            <Box>
              <CommonBreadcrumbs
                items={[{ label: "TOP", href: "/" }]}
                current="マスタ管理"
              />
            </Box>
            <Box>
              <Outlet />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
