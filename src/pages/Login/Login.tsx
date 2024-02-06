import "@aws-amplify/ui-react/styles.css";
import "./styles.scss";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Stack } from "@mui/material";
import { Amplify } from "aws-amplify";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import awsConfig from "../../aws-exports";
import logo from "./logo_large.png";

Amplify.configure(awsConfig);

export default function Login() {
  const { route } = useAuthenticator((context) => [
    context.route,
    context.user,
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const from = (location.state?.from as string) || "/";

  useEffect(() => {
    if (route !== "authenticated") return;

    navigate(from, { replace: true });
  }, [route, navigate, from]);

  return (
    <Stack
      direction="column"
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ pt: 10 }}
    >
      <img src={logo} height={200} />
      <Authenticator hideSignUp />
    </Stack>
  );
}
