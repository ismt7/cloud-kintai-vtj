import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Stack } from "@mui/material";

import { OpenAPI, Service } from "./client";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function Layout() {
  const { user } = useAuthenticator();
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user?.attributes?.email) return;

    OpenAPI.BASE = "http://app:8000";
    const staff = Service.getStaffsStaffsGet(1);
    console.log(staff);
    // void dispatch(fetchLoginStaff({ mailAddress: user.attributes.email }));
  }, [user]);

  return (
    <>
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
      </Stack>
    </>
  );
}
export default Layout;
