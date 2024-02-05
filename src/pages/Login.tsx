import "@aws-amplify/ui-react/styles.css";

import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import awsConfig from "../aws-exports";

Amplify.configure(awsConfig);

function Login() {
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
    <View className="auth-wrapper">
      <Authenticator hideSignUp></Authenticator>
    </View>
  );
}
export default Login;
