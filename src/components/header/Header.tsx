import { Box, IconButton, Stack, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LogImage from "../../images/logo.png";
import Button from "../button/Button";
import Link from "../link/Link";
import { StaffStatus } from "../../lib/reducers/loginStaffReducer";
import { useAppSelector } from "../../lib/hooks";
import { selectLoginStaff } from "../../lib/store";

interface HeaderProps {
  signIn?: () => void;
  signOut?: () => void;
}

const Header = ({ signIn, signOut }: HeaderProps) => {
  const staff = useAppSelector(selectLoginStaff);
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (staff?.status === StaffStatus.DONE && staff?.data?.mailAddress) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
  }, [staff]);

  return (
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
                label="勤怠一覧"
                href="/list"
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
            {[1, 3].indexOf(staff.data?.staffRoles.roleId || 0) !== -1 && (
              <Box>
                <Button
                  color="login"
                  label="管理ページ"
                  onClick={() => {
                    navigate("/admin/", { replace: true });
                  }}
                  variant="outlined"
                  height="100%"
                  width="110px"
                />
              </Box>
            )}

            <Box>
              {isSignIn ? (
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
            </Box>
          </Stack>
        </Box>
        {staff && (
          <Box sx={{ minWidth: "115px", textAlign: "center" }}>
            <Typography variant="body1">
              {staff.data?.lastName && staff.data?.firstName
                ? `${staff.data.lastName} ${staff.data?.firstName} さん`
                : "ゲスト さん"}
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
};

export default Header;
