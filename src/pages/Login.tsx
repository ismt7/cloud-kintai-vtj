import { useEffect } from "react";
import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { useLocation, useNavigate } from "react-router";
import awsConfig from "../aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import fetchStaff from "../lib/staff/FetchStaff";
import { selectStaff } from "../lib/store";
import { StaffStatus } from "../lib/reducers/staffSlice";

Amplify.configure(awsConfig);

function Login() {
  const { route, user } = useAuthenticator((context) => [
    context.route,
    context.user,
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const staff = useAppSelector(selectStaff);
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const from = (location.state?.from as string) || "/";

  useEffect(() => {
    if (route === "authenticated") {
      if (
        user?.attributes?.email &&
        staff.status === StaffStatus.NOT_PROCESSING
      ) {
        void dispatch(
          fetchStaff({
            mailAddress: user.attributes.email,
          })
        );
      }

      if (staff.status === StaffStatus.DONE && staff.data?.mailAddress) {
        navigate(from, { replace: true });
      }

      if (
        staff.status === StaffStatus.ERROR ||
        (staff.status === StaffStatus.DONE && !staff.data?.mailAddress)
      ) {
        navigate("/", { replace: true });
      }
    }
  }, [route, navigate, from, staff]);

  return (
    <View className="auth-wrapper">
      <Authenticator hideSignUp></Authenticator>
    </View>
  );
}
export default Login;
