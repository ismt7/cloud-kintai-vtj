import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Stack } from "@mui/material";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useAppDispatch } from "./lib/hooks";
import { clearLoginStaff } from "./lib/reducers/loginStaffReducer";
import fetchLoginStaff from "./lib/staff/FetchLoginStaff";

function Layout() {
  const { signOut, user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signInHandler = () => navigate("/login");
  const signOutHandler = () => {
    dispatch(clearLoginStaff());
    signOut();
  };

  useEffect(() => {
    if (!user?.attributes?.email) return;
    void dispatch(fetchLoginStaff({ mailAddress: user.attributes.email }));
  }, [user]);

  return (
    <>
      <Stack sx={{ height: "100vh" }}>
        <Box>
          <Header signIn={signInHandler} signOut={signOutHandler} />
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
