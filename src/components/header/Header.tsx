import { Link as RouterLink, useNavigate } from "react-router-dom";

// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Avatar,
  // Badge,
  Box,
  Container,
  IconButton,
  Stack,
} from "@mui/material";

import { useEffect, useState } from "react";
import useCognitoUser, { UserRole } from "../../hooks/useCognitoUser";
import LogImage from "../../images/logo.png";
import Button from "../button/Button";
import Link from "../link/Link";

export default function Header({
  cognitoUserId,
  signOut,
}: {
  cognitoUserId: string | undefined;
  signOut: () => void;
}) {
  const {
    cognitoUser,
    isCognitoUserRole,
    loading: cognitoUserLoading,
  } = useCognitoUser();

  const navigate = useNavigate();

  const [pathName, setPathName] = useState("/register");

  useEffect(() => {
    const url = new URL(window.location.href);
    const name = url.pathname === "/" ? "/register" : url.pathname;
    setPathName(name);
  }, []);

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

  const MenuItem = () => {
    const viewableList = [];
    const menuList = [
      { label: "勤怠打刻", href: "/register" },
      { label: "勤怠一覧", href: "/list" },
      { label: "ドキュメント", href: "/docs" },
    ];

    const adminMenuList = [
      { label: "スタッフ管理", href: "/admin/staff" },
      { label: "勤怠管理", href: "/admin/attendances" },
      { label: "マスタ管理", href: "/admin/master" },
    ];

    // システム管理者
    if (isCognitoUserRole(UserRole.Admin)) {
      viewableList.push(...menuList, ...adminMenuList);
    }

    // スタッフ管理者
    if (isCognitoUserRole(UserRole.StaffAdmin)) {
      viewableList.push(...menuList, ...adminMenuList);
    }

    // スタッフ
    if (isCognitoUserRole(UserRole.Staff)) {
      viewableList.push(...menuList);
    }

    // ゲスト
    // 処理なし

    return (
      <Stack direction="row" spacing={0} sx={{ width: "auto", height: 1 }}>
        {viewableList.map((menu, index) => (
          <Box key={index}>
            <Link
              label={menu.label}
              href={menu.href}
              sx={{
                display: "block",
                height: 1,
                lineHeight: "32px",
                px: 1,
                color: pathName === menu.href ? "#0FA85E" : "white",
                backgroundColor: pathName === menu.href ? "white" : "inherit",
                textDecoration: "none",
              }}
            />
          </Box>
        ))}
      </Stack>
    );
  };

  const StaffIcon = ({ name }: { name: string | undefined }) => (
    <IconButton aria-label="account">
      <Avatar>{name ? name.slice(0, 1) : ""}</Avatar>
    </IconButton>
  );

  if (cognitoUserLoading) {
    return null;
  }

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
            <MenuItem />
          </Box>
          <Box>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <Box>
                <Button
                  color={cognitoUserId ? "logout" : "login"}
                  label={cognitoUserId ? "ログアウト" : "ログイン"}
                  onClick={cognitoUserId ? signOut : signIn}
                  variant={cognitoUserId ? "contained" : "outlined"}
                  height="100%"
                  width="110px"
                />
              </Box>
              {/* <Box>
                <IconButton aria-label="notification">
                  <Badge badgeContent={100} color="secondary">
                    <NotificationsNoneIcon
                      style={{ color: "white" }}
                      fontSize="medium"
                    />
                  </Badge>
                </IconButton>
              </Box> */}
              <Box>
                {/* <StaffIcon name={staff?.last_name} /> */}
                <StaffIcon name={cognitoUser?.familyName} />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </header>
  );
}
