import { Outlet } from "react-router-dom";

import { Box, Stack } from "@mui/material";

import { useAuthenticator } from "@aws-amplify/ui-react";
import SnackbarGroup from "./components/ snackbar/SnackbarGroup";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function Layout() {
  const { user, signOut } = useAuthenticator();
  const cognitoUserId = user?.attributes?.sub;

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
export default Layout;
