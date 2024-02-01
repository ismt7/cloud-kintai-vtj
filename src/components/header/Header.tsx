import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import useCognitoUser, { UserRole } from "../../hooks/useCognitoUser";
import LogImage from "../../images/logo.png";
import Link from "../link/Link";

const SignOutButton = styled(Button)(({ theme }) => ({
  color: theme.palette.logout.contrastText,
  backgroundColor: theme.palette.logout.main,
  border: `3px solid ${theme.palette.logout.main}`,
  whiteSpace: "nowrap",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  "&:hover": {
    color: theme.palette.logout.main,
    backgroundColor: theme.palette.logout.contrastText,
  },
}));

const SignInButton = styled(Button)(({ theme }) => ({
  color: theme.palette.login.contrastText,
  backgroundColor: theme.palette.login.main,
  whiteSpace: "nowrap",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  "&:hover": {
    color: theme.palette.login.main,
    backgroundColor: theme.palette.login.contrastText,
  },
}));

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
      { label: "勤怠一覧", href: "/attendance/list" },
      { label: "ドキュメント", href: "/docs" },
    ];

    const adminMenuList = [
      { label: "スタッフ管理", href: "/admin/staff" },
      { label: "勤怠管理", href: "/admin/attendances" },
      { label: "マスタ管理", href: "/admin/master" },
    ];

    // システム管理者、スタッフ管理者
    if (
      isCognitoUserRole(UserRole.Admin) ||
      isCognitoUserRole(UserRole.StaffAdmin)
    ) {
      viewableList.push(...menuList, ...adminMenuList);
    } else if (isCognitoUserRole(UserRole.Staff)) {
      viewableList.push(...menuList);
    } else {
      viewableList.push(menuList[2]);
    }

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
                {cognitoUserId ? (
                  <SignOutButton onClick={signOut}>ログアウト</SignOutButton>
                ) : (
                  <SignInButton onClick={signIn}>ログイン</SignInButton>
                )}
              </Box>
              <Box>
                <StaffIcon name={cognitoUser?.familyName} />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </header>
  );
}
