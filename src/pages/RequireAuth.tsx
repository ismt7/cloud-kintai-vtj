import { useAuthenticator } from "@aws-amplify/ui-react";

interface RequireAuthProps {
  children: JSX.Element;
}

async function RequireAuth({
  children,
}: RequireAuthProps): Promise<JSX.Element> {
  // const location = useLocation();
  // const { route } = useAuthenticator((context) => [context.route]);
  const { user } = useAuthenticator();

  // if (route !== "authenticated") {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  return children;
}
export default RequireAuth;
