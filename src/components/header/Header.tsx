import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";

import DesktopMenu from "./DesktopMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { SignInOutButton } from "./SignInOutButton";
import AppsIcon from "@mui/icons-material/Apps";
import { theme } from "../../lib/theme";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { LinkGridItem } from "./LinkGridItem";

export const SignOutButton = styled(Button)(({ theme }) => ({
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

export const SignInButton = styled(Button)(({ theme }) => ({
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
  const [pathName, setPathName] = useState("/register");

  useEffect(() => {
    const url = new URL(window.location.href);
    const name = url.pathname === "/" ? "/register" : url.pathname;
    setPathName(name);
  }, [window.location.href]);

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
          <MobileMenu pathName={pathName} />
          <ExternalLinks />
          <SignInOutButton pathName={pathName} />
        </Stack>
      </Container>
    </header>
  );
}

function ExternalLinks() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? "external-links-popup" : undefined;

  const handleClickAway = () => {
    setAnchor(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <AppsIcon
          sx={{
            color: "white",
          }}
        />
      </IconButton>
      <BasePopup id={id} open={open} anchor={anchor}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper
            elevation={3}
            sx={{
              width: "300px",
              height: "400px",
              m: 2,
              p: 2,
              border: `5px solid ${theme.palette.primary.main}`,
            }}
          >
            <Grid container spacing={1}>
              <LinkGridItem
                url="http://ginjiro.office.begi.net:3021/"
                title="交通費申請"
                iconType="train"
              />
            </Grid>
          </Paper>
        </ClickAwayListener>
      </BasePopup>
    </>
  );
}
