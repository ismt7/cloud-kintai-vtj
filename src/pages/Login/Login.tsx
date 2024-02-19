import "@aws-amplify/ui-react/styles.css";
import "./styles.scss";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Stack } from "@mui/material";
import { Amplify } from "aws-amplify";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import awsConfig from "../../aws-exports";
import logo from "./logo_large.png";

Amplify.configure(awsConfig);

export default function Login() {
  const { authStatus } = useAuthenticator();
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const from = (location.state?.from as string) || "/";

  useEffect(() => {
    if (authStatus !== "authenticated") return;

    navigate(from, { replace: true });
  }, [authStatus, navigate, from]);

  return (
    <Stack
      direction="column"
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        pt: {
          xs: 0,
          sm: 10,
        },
      }}
    >
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <img src={logo} height={200} />
      </Box>
      <Authenticator hideSignUp />
    </Stack>
  );
}
