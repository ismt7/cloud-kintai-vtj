import { Outlet } from "react-router-dom";

import { Box, Stack } from "@mui/material";

import { useAuthenticator } from "@aws-amplify/ui-react";
import SnackbarGroup from "./components/ snackbar/SnackbarGroup";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function Layout() {
  const { user, signOut } = useAuthenticator();
  const cognitoUserId = user?.attributes?.sub;
  const mailAddress = user?.attributes?.email;

  return (
    <>
      <Stack sx={{ height: "100vh" }}>
        <Box>
          <Header
            cognitoUserId={cognitoUserId}
            mailAddress={mailAddress}
            signOut={signOut}
          />
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
export default Layout;
