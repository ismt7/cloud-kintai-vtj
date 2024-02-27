import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Stack } from "@mui/material";
import { Storage } from "aws-amplify";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import SnackbarGroup from "./components/ snackbar/SnackbarGroup";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

export default function Layout() {
  const { user, signOut, authStatus } = useAuthenticator();
  const cognitoUserId = user?.attributes?.sub;

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.pathname === "/login") return;

    if (!cognitoUserId) return;

    const isMailVerified = user?.attributes?.email_verified ? true : false;
    if (isMailVerified) return;

    alert(
      "メール認証が完了していません。ログイン時にメール認証を行なってください。"
    );

    try {
      void signOut();
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    if (authStatus !== "authenticated") return;

    void Storage.get("revision.json").then(async (fileUrl) => {
      void fetch(fileUrl)
        .then((res) => res.blob())
        .then((blob) => new File([blob], "revision.json"))
        .then(async (file) => file.text())
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
        .then((text) => JSON.parse(text).revision)
        .then((revision) => {
          if (!revision) return;

          const currentRevision = localStorage.getItem("revision");
          if (currentRevision === revision) return;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          localStorage.setItem("revision", revision);
        });
    });

    setInterval(() => {
      void Storage.get("revision.json").then(async (fileUrl) => {
        void fetch(fileUrl)
          .then((res) => res.blob())
          .then((blob) => new File([blob], "revision.json"))
          .then(async (file) => file.text())
          // eslint-disable-next-line max-len
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
          .then((text) => JSON.parse(text).revision)
          .then((revision) => {
            if (!revision) return;

            const currentRevision = localStorage.getItem("revision");

            if (currentRevision === revision) return;

            if (currentRevision) {
              // eslint-disable-next-line no-alert
              const result = window.confirm(
                "新しいバージョンがリリースされました、すぐに反映しますか？"
              );

              if (!result) return;

              window.location.reload();
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            localStorage.setItem("revision", revision);
          });
      });
    }, 1000 * 60 * 60);
  }, []);

  return (
    <>
      <Stack sx={{ height: "100vh" }}>
        <Box>
          <Header cognitoUserId={cognitoUserId} signOut={signOut} />
        </Box>
        <Box sx={{ flexGrow: 2 }}>
          <Outlet />
        </Box>
        <Box>
          <Footer />
        </Box>
        <SnackbarGroup />
      </Stack>
    </>
  );
}
