import { Box, Stack } from "@mui/material";
import { Provider } from "react-redux";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { store } from "../../../app/store";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import TimeRecorder from "../../../components/time_recorder/TimeRecorder";

function Resist() {
  const { user, signOut } = useAuthenticator();
  const cognitoUserId = user?.attributes?.sub;
  const mailAddress = user?.attributes?.email;

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
        <Box
          sx={{ height: 1, py: 10, justifyContent: "center", display: "flex" }}
        >
          <TimeRecorder cognitoUserId={cognitoUserId} />
        </Box>
        <Box>
          <Footer />
        </Box>
      </Stack>
    </Provider>
  );
}

export default Resist;
