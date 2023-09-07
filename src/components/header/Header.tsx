import { Link as RouterLink, useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useAppSelectorV2 } from "../../app/hooks";
import LogImage from "../../images/logo.png";
import { selectLoginStaff } from "../../lib/reducers/loginStaffReducer";
import Button from "../button/Button";
import Link from "../link/Link";

const Header = () => {
  const { signOut, user } = useAuthenticator();
  const navigate = useNavigate();

  const staff = useAppSelectorV2(selectLoginStaff);

  const signIn = () => {
    navigate("/login");
  };

  const Logo = () => (
    <Box
      sx={{
        height: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RouterLink to="/">
        <img
          src={LogImage}
          alt="クラウド勤怠のロゴ"
          style={{ height: "100%" }}
        />
      </RouterLink>
    </Box>
  );

  const MenuItem = ({ roleId }: { roleId?: number }) => {
    const menuList = [
      {
        label: "勤怠打刻",
        href: "/register",
      },
      {
        label: "勤怠一覧",
        href: "/list",
      },
      {
        label: "リンク",
        href: "/",
      },
      {
        label: "リンク",
        href: "/",
      },
    ];

    const adminMenuList = [
      {
        label: "スタッフ管理",
        href: "/admin/staff",
      },
      {
        label: "勤怠管理",
        href: "/admin/attendances",
      },
      {
        label: "マスタ管理",
        href: "/admin/master",
      },
    ];

    if (roleId === 1 || roleId === 3) {
      menuList.push(...adminMenuList);
    }

    return (
      <Stack direction="row" spacing={0} sx={{ width: "auto", height: 1 }}>
        {menuList.map((menu, index) => (
          <Box key={index}>
            <Link
              label={menu.label}
              href={menu.href}
              sx={{
                display: "block",
                height: 1,
                lineHeight: "32px",
                px: 1,
              }}
            />
          </Box>
        ))}
      </Stack>
    );
  };

  const StaffName = () => (
    <Box sx={{ minWidth: "115px", textAlign: "center" }}>
      <Typography variant="body1">
        {staff.data?.lastName && staff.data?.firstName
          ? `${staff.data.lastName} ${staff.data?.firstName} さん`
          : "ゲスト さん"}
      </Typography>
    </Box>
  );

  const StaffIcon = () => (
    <IconButton aria-label="account">
      <AccountCircleIcon style={{ color: "white" }} />
    </IconButton>
  );

  return (
    <header
      style={{
        backgroundColor: "#0FA85E",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          color="white"
          sx={{ p: 1, height: "50px", boxSizing: "border-box" }}
          spacing={2}
        >
          <Logo />
          <Box sx={{ width: 1, height: 1 }}>
            <MenuItem roleId={staff.data?.staffRoles.roleId} />
          </Box>
          <Box>
            <Stack direction="row" spacing={1}>
              <Box>
                <Button
                  color={user ? "logout" : "login"}
                  label={user ? "ログアウト" : "ログイン"}
                  onClick={user ? signOut : signIn}
                  variant={user ? "contained" : "outlined"}
                  height="100%"
                  width="110px"
                />
              </Box>
            </Stack>
          </Box>
          <StaffName />
          <Box>
            <Stack direction="row">
              <Box>
                <IconButton aria-label="notification">
                  <NotificationsNoneIcon
                    style={{ color: "white" }}
                    fontSize="medium"
                  />
                </IconButton>
              </Box>
              <Box>
                <StaffIcon />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </header>
  );
};

export default Header;
