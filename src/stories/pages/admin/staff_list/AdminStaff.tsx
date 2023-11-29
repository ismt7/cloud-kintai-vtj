import { Box, Stack } from "@mui/material";
import { Provider } from "react-redux";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { store } from "../../../../app/store";
import Footer from "../../../../components/footer/Footer";
import Header from "../../../../components/header/Header";
import { LoginStaff } from "../../../../components/staff_list/StaffList";
import fetchLoginStaff from "./fetchLoginStaff";

const AdminStaff = () => {
  const { user, signOut } = useAuthenticator();
  const [loginStaff, setLoginStaff] = useState<LoginStaff>(null);

  const cognitoUserId = user?.attributes?.sub;
  const mailAddress = user?.attributes?.email;

  useEffect(() => {
    void fetchLoginStaff(user, (value) => setLoginStaff(value));
  }, [user]);

  return (
    <Provider store={store}>
      <Stack sx={{ height: "100vh" }}>
        <Box>
          <Header
            cognitoUserId={cognitoUserId}
            mailAddress={mailAddress}
            signOut={signOut}
          />
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
};
export default AdminStaff;
