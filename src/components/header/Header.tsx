import { Link as RouterLink, useNavigate } from "react-router-dom";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Stack,
} from "@mui/material";

import { useEffect, useState } from "react";
import { Staff, StaffRole } from "../../client";
import LogImage from "../../images/logo.png";
import Button from "../button/Button";
import Link from "../link/Link";
import fetchLoginStaff from "./fetchLoginStaff";

const Header = ({
  cognitoUserId,
  mailAddress,
  signOut,
}: {
  cognitoUserId: string | undefined;
  mailAddress: string | undefined;
  signOut: () => void;
}) => {
  const [staff, setStaff] = useState<Staff | null>(null);
  const [staffRole, setStaffRole] = useState<StaffRole | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cognitoUserId || !mailAddress) {
      return;
    }

    void fetchLoginStaff(
      cognitoUserId,
      mailAddress,
      (createdStaff, createdStaffRole) => {
        setStaff(createdStaff);
        setStaffRole(createdStaffRole);
      }
    );
  }, [cognitoUserId, mailAddress]);

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
    const viewableList = [];
    const menuList = [
      { label: "勤怠打刻", href: "/register" },
      { label: "勤怠一覧", href: "/list" },
      { label: "リンク", href: "/" },
      { label: "リンク", href: "/" },
    ];

    const adminMenuList = [
      { label: "スタッフ管理", href: "/admin/staff" },
      { label: "勤怠管理", href: "/admin/attendances" },
      { label: "マスタ管理", href: "/admin/master" },
    ];

    switch (roleId) {
      case 1: // システム管理者
      case 2: // スタッフ管理者
        viewableList.push(...menuList, ...adminMenuList);
        break;

      case 3: // スタッフ
        viewableList.push(...menuList);
        break;

      default: // ゲスト
        // 処理なし
        break;
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
              }}
            />
          </Box>
        ))}
      </Stack>
    );
  };

  const StaffIcon = ({ name }: { name: Staff["last_name"] }) => (
    <IconButton aria-label="account">
      <Avatar>{name?.slice(0, 1)}</Avatar>
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
            <MenuItem roleId={staffRole?.role_id} />
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
              <Box>
                <IconButton aria-label="notification">
                  <Badge badgeContent={100} color="secondary">
                    <NotificationsNoneIcon
                      style={{ color: "white" }}
                      fontSize="medium"
                    />
                  </Badge>
                </IconButton>
              </Box>
              <Box>
                <StaffIcon name={staff?.last_name} />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </header>
  );
};

export default Header;
