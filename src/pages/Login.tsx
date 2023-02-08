import { useEffect } from "react";
import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation, useNavigate } from "react-router";
import awsConfig from "../aws-exports";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsConfig);

function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const from = location.state?.from || "/";

  useEffect(() => {
    if (route === "authenticated") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);

  return (
    <View className="auth-wrapper">
      <Authenticator></Authenticator>
    </View>
  );
}
export default Login;
