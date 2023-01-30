import { Box, IconButton, Stack } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "../components/button/Button";
import LogImage from "../images/logo.png";

const Header = () => (
  <header>
    <Stack
      direction="row"
      alignItems="center"
      bgcolor="#0FA85E"
      color="white"
      sx={{ p: 0.5 }}
      spacing={2}
    >
      <Box sx={{ height: 1 }}>
        <img
          src={LogImage}
          alt="クラウド勤怠のロゴ"
          style={{ height: "40px" }}
        />
      </Box>
      <Box sx={{ width: 1 }}>
        <Stack direction="row" spacing={1}>
          <Box>リンク</Box>
          <Box>リンク</Box>
          <Box>リンク</Box>
          <Box>リンク</Box>
        </Stack>
      </Box>
      <Box>
        <Stack direction="row" spacing={1}>
          {/* <Button
            color="logout"
            label="管理者ページ"
            onClick={() => {}}
            variant="contained"
            height="40px"
            width="108px"
          /> */}
          <Button
            color="login"
            label="ログイン"
            onClick={() => {}}
            variant="outlined"
            height="40px"
            width="108px"
          />
        </Stack>
      </Box>
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
