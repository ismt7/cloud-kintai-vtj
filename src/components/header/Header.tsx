import { Box, Button, Container, Stack, styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DesktopMenu from "./DesktopMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import StaffIcon from "./StaffIcon";
import { AuthContext } from "../../Layout";

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

export default function Header() {
  const navigate = useNavigate();
  const { signOut, cognitoUser } = useContext(AuthContext);

  const [pathName, setPathName] = useState("/register");

  useEffect(() => {
    const url = new URL(window.location.href);
    const name = url.pathname === "/" ? "/register" : url.pathname;
    setPathName(name);
  }, [window.location.href]);

  const signIn = () => {
    navigate("/login");
  };

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
          <DesktopMenu pathName={pathName} />
          <MobileMenu />
          {pathName !== "/login" && (
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <Stack direction="row" alignItems={"center"} spacing={1}>
                <Box>
                  {cognitoUser?.id ? (
                    <SignOutButton onClick={signOut}>ログアウト</SignOutButton>
                  ) : (
                    <SignInButton onClick={signIn}>ログイン</SignInButton>
                  )}
                </Box>
                {cognitoUser && (
                  <Box>
                    <StaffIcon name={cognitoUser.familyName} />
                  </Box>
                )}
              </Stack>
            </Box>
          )}
        </Stack>
      </Container>
    </header>
  );
}
