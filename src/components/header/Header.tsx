import { Box, IconButton, Stack, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogImage from "../../images/logo.png";
import Button from "../button/Button";
import Link from "../link/Link";

interface User {
  lastName: string;
  firstName: string;
  mailAddress: string;
  role: "admin" | "user";
}

interface HeaderProps {
  user?: User;
}

const Header = ({ user }: HeaderProps) => (
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
        <img
          src={LogImage}
          alt="クラウド勤怠のロゴ"
          style={{ height: "100%" }}
        />
      </Box>
      <Box sx={{ width: 1, height: 1 }}>
        <Stack direction="row" spacing={0} sx={{ width: "auto", height: 1 }}>
          <Box>
            <Link
              label="勤怠打刻"
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
          {user?.role === "admin" && (
            <Button
              color="login"
              label="管理ページ"
              onClick={() => {}}
              variant="outlined"
              height="100%"
              width="110px"
            />
          )}

          {user ? (
            <Button
              color="logout"
              label="ログアウト"
              onClick={() => {}}
              variant="contained"
              height="100%"
              width="110px"
            />
          ) : (
            <Button
              color="login"
              label="ログイン"
              onClick={() => {}}
              variant="outlined"
              height="100%"
              width="110px"
            />
          )}
        </Stack>
      </Box>
      {user && (
        <Box sx={{ minWidth: "115px", textAlign: "center" }}>
          <Typography variant="body1">
            {user.lastName} {user.firstName} さん
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
