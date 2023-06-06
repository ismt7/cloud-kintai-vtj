import { useLocation, Navigate } from "react-router-dom";

import { useAuthenticator } from "@aws-amplify/ui-react";

interface RequireAuthProps {
  children: JSX.Element;
}

function RequireAuth({ children }: RequireAuthProps): JSX.Element {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);
  if (route !== "authenticated") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
export default RequireAuth;
