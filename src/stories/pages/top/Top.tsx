import { Box, Stack, Typography } from "@mui/material";
import { Provider } from "react-redux";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { store } from "../../../app/store";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";

function Top() {
  const { user, signOut } = useAuthenticator();
  const cognitoUserId = user?.attributes?.sub;

  return (
    <Provider store={store}>
      <Stack sx={{ height: "100vmax" }}>
        <Box>
          <Header cognitoUserId={cognitoUserId} signOut={signOut} />
        </Box>
        <Box sx={{ height: 1, py: { lg: 5, xl: 10 }, px: { lg: 5, xl: 50 } }}>
          <Typography variant="h2">ようこそ</Typography>
          <Typography variant="h2">新しい勤怠システムへ</Typography>

          <Typography variant="h4">見出し1</Typography>
          <Typography variant="body1">
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </Typography>

          <Typography variant="h4">見出し1</Typography>
          <Typography variant="body1">
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </Typography>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Stack>
    </Provider>
  );
}

export default Top;
