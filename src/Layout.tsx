import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, LinearProgress, Stack } from "@mui/material";
import { Storage } from "aws-amplify";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import SnackbarGroup from "./components/ snackbar/SnackbarGroup";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import useCognitoUser from "./hooks/useCognitoUser";
import useAppConfig from "./hooks/useAppConfig/useAppConfig";
import { AppConfigContext } from "./context/AppConfigContext";

export default function Layout() {
  const navigate = useNavigate();
  const { user, signOut, authStatus } = useAuthenticator();
  const {
    cognitoUser,
    isCognitoUserRole,
    loading: cognitoUserLoading,
  } = useCognitoUser();
  const {
    fetchConfig,
    saveConfig,
    getStartTime,
    getEndTime,
    getConfigId,
    getLinks,
    getReasons,
    getOfficeMode,
    getQuickInputStartTimes,
    getQuickInputEndTimes,
    getLunchRestStartTime,
    getLunchRestEndTime,
    loading: appConfigLoading,
  } = useAppConfig();

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.pathname === "/login") return;

    if (authStatus === "unauthenticated") {
      navigate("/login");
      return;
    }

    if (authStatus !== "authenticated") return;

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
  }, [authStatus, user, window.location.href]);

  useEffect(() => {
    if (authStatus !== "authenticated") return;

    void Storage.get("revision.json", { download: true })
      .then((result) => {
        if (!result.Body) return;
        result.Body.text()
          .then((text) => {
            const revision = JSON.parse(text).revision as string;
            if (revision) {
              const currentRevision = localStorage.getItem("revision");
              if (currentRevision !== revision) {
                localStorage.setItem("revision", revision);
              }
            }
          })
          .catch((e) => {
            throw e;
          });
      })
      .catch(() => {
        console.error("Version check error");
      });

    setInterval(() => {
      void Storage.get("revision.json", { download: true })
        .then((result) => {
          if (!result.Body) return;
          result.Body.text()
            .then((text) => {
              const revision = JSON.parse(text).revision as string;
              const currentRevision = localStorage.getItem("revision");
              if (currentRevision === revision) return;

              if (currentRevision) {
                // eslint-disable-next-line no-alert
                const result = window.confirm(
                  "新しいバージョンがリリースされました、すぐに反映しますか？"
                );

                if (result) {
                  window.location.reload();
                  localStorage.setItem("revision", revision);
                }
              }
            })
            .catch((e) => {
              throw e;
            });
        })
        .catch(() => {
          console.error("Version check error");
        });
    }, 1000 * 60 * 60);
  }, [authStatus]);

  useEffect(() => {
    fetchConfig();
  }, []);

  if (cognitoUserLoading || appConfigLoading) {
    return <LinearProgress />;
  }

  const signIn = () => {
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        signOut,
        signIn,
        isCognitoUserRole,
        user,
        authStatus,
        cognitoUser,
      }}
    >
      <AppConfigContext.Provider
        value={{
          fetchConfig,
          saveConfig,
          getStartTime,
          getEndTime,
          getConfigId,
          getLinks,
          getReasons,
          getOfficeMode,
          getQuickInputStartTimes,
          getQuickInputEndTimes,
          getLunchRestStartTime,
          getLunchRestEndTime,
        }}
      >
        <Stack sx={{ height: "100vh" }}>
          <Box>
            <Header />
          </Box>
          <Box sx={{ flexGrow: 2 }}>
            <Outlet />
          </Box>
          <Box>
            <Footer />
          </Box>
          <SnackbarGroup />
        </Stack>
      </AppConfigContext.Provider>
    </AuthContext.Provider>
  );
}
