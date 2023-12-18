import { Box, Stack } from "@mui/material";
import { Provider } from "react-redux";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { store } from "../../../../app/store";
import Footer from "../../../../components/footer/Footer";
import Header from "../../../../components/header/Header";

export default function AdminStaff() {
  const { user, signOut } = useAuthenticator();

  const cognitoUserId = user?.attributes?.sub;

  return (
    <Provider store={store}>
      <Stack sx={{ height: "100vh" }}>
        <Box>
          <Header cognitoUserId={cognitoUserId} signOut={signOut} />
        </Box>
        <Box sx={{ height: 1 }}>
          <Stack direction="row" sx={{ height: 1 }}>
            <Box sx={{ width: "350px", height: 1 }}>
              {/* <StaffList staffs={[]} /> */}
            </Box>
            <Box sx={{ p: 5, flexGrow: 2 }}>
              {/* <StaffForm loginStaff={loginStaff} /> */}
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
