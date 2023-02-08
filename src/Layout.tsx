import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { Staff } from "./api";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function Layout() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  const signIn = () => navigate("/login");

  const staff = ((): Staff | undefined => {
    if (user?.attributes) {
      return {
        lastName: "田中",
        firstName: "太郎",
        mailAddress: user?.attributes?.email || "",
        staffId: 1,
      };
    }

    return undefined;
  })();

  return (
    <>
      <Stack sx={{ height: "100vh" }}>
        <Box>
          <Header staff={staff} signIn={signIn} signOut={signOut} />
        </Box>
        <Box sx={{ height: 1 }}>
          <main>
            <Outlet />
          </main>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Stack>
    </>
  );
}
export default Layout;
