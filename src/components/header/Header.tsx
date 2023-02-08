import { Box, IconButton, Stack, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link as RouterLink } from "react-router-dom";
import LogImage from "../../images/logo.png";
import Button from "../button/Button";
import Link from "../link/Link";
import { Staff } from "../../api";

interface HeaderProps {
  staff?: Staff;
  signIn?: () => void;
  signOut?: () => void;
}

const Header = ({ staff, signIn, signOut }: HeaderProps) => (
  <header>
    <Stack
      direction="row"
      alignItems="center"
      bgcolor="#0FA85E"
      color="white"
      sx={{ p: 1, height: "50px", boxSizing: "border-box" }}
      spacing={2}
    >
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
      <Box sx={{ width: 1, height: 1 }}>
        <Stack direction="row" spacing={0} sx={{ width: "auto", height: 1 }}>
          <Box>
            <Link
              label="勤怠打刻"
              href="/register"
              sx={{ display: "block", height: 1, lineHeight: "32px", px: 1 }}
            />
          </Box>
          <Box>
            <Link
              label="リンク"
              sx={{ display: "block", height: 1, lineHeight: "32px", px: 1 }}
            />
          </Box>
          <Box>
            <Link
              label="リンク"
              sx={{ display: "block", height: 1, lineHeight: "32px", px: 1 }}
            />
          </Box>
          <Box>
            <Link
              label="リンク"
              sx={{ display: "block", height: 1, lineHeight: "32px", px: 1 }}
            />
          </Box>
        </Stack>
      </Box>
      <Box>
        <Stack direction="row" spacing={1}>
          {/* {user?.role === "admin" && (
            <Button
              color="login"
              label="管理ページ"
              onClick={() => {}}
              variant="outlined"
              height="100%"
              width="110px"
            />
          )} */}

          {staff ? (
            <Button
              color="logout"
              label="ログアウト"
              onClick={signOut}
              variant="contained"
              height="100%"
              width="110px"
            />
          ) : (
            <Button
              color="login"
              label="ログイン"
              onClick={signIn}
              variant="outlined"
              height="100%"
              width="110px"
            />
          )}
        </Stack>
      </Box>
      {staff && (
        <Box sx={{ minWidth: "115px", textAlign: "center" }}>
          <Typography variant="body1">
            {staff.lastName} {staff.firstName} さん
          </Typography>
        </Box>
      )}
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
            <IconButton aria-label="account">
              <AccountCircleIcon style={{ color: "white" }} />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </Stack>
  </header>
);

export default Header;
