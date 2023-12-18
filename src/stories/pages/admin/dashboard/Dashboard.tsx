import { Box, Stack } from "@mui/material";
import { Provider } from "react-redux";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { store } from "../../../../app/store";
import Footer from "../../../../components/footer/Footer";
import Header from "../../../../components/header/Header";
import Menu from "../../../../components/menu/Menu";

function Dashboard() {
  const { user, signOut } = useAuthenticator();
  const cognitoUserId = user?.attributes?.sub;

  return (
    <Provider store={store}>
      <Stack sx={{ height: "100vh" }}>
        <Box>
          <Header cognitoUserId={cognitoUserId} signOut={signOut} />
        </Box>
        <Box sx={{ height: 1, px: 5 }}>
          <Stack>
            <Box sx={{ height: "50px" }}>
              <Menu />
            </Box>
          </Stack>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Stack>
    </Provider>
  );
}

export default Dashboard;
