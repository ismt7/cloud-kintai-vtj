import { Box, ListItemButton, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const menuList = [
    {
      name: "締日",
      path: "/admin/master/job_term",
    },
    {
      name: "休日カレンダー",
      path: "/admin/master/holiday_calendar",
    },
    {
      name: "修正理由",
      path: "/admin/master/modify_reason",
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
    <>
      <Stack direction="row" sx={{ height: 1, py: 2 }}>
        <Box>
          <Stack sx={{ height: 1 }}>{menuBoxList}</Stack>
        </Box>
        <Box sx={{ flexGrow: 2 }}>
          <Outlet />
        </Box>
      </Stack>
    </>
  );
}
