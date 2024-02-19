import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

import { StaffRole } from "./useStaffs/useStaffs";

export interface CognitoUser {
  id: string;
  givenName: string;
  familyName: string;
  mailAddress: string;
  owner: boolean;
  roles: StaffRole[];
}

export default function useCognitoUser() {
  const { user } = useAuthenticator();
  const [loading, setLoading] = useState(false);
  const [cognitoUser, setCognitoUser] = useState<
    CognitoUser | null | undefined
  >(undefined);

  useEffect(() => {
    setLoading(true);
    if (!user) {
      setCognitoUser(null);
      setLoading(false);
      return;
    }

    const userAttributes = user.attributes;
    if (!userAttributes) {
      setCognitoUser(null);
      setLoading(false);
      return;
    }

    const { sub: id } = userAttributes;

    const signInUserSession = user.getSignInUserSession();
    if (!signInUserSession) {
      setCognitoUser(null);
      setLoading(false);
      return;
    }

    const idToken = signInUserSession.getIdToken();
    const userGroups = idToken.payload["cognito:groups"] as string[];

    if (!user?.attributes?.sub) {
      setCognitoUser(null);
      setLoading(false);
      return;
    }

    setCognitoUser({
      id,
      givenName: user.attributes.given_name,
      familyName: user.attributes.family_name,
      mailAddress: user.attributes.email,
      owner: !!user.attributes["custom:owner"],
      roles: (() =>
        userGroups.map((group) => {
          switch (group) {
            case "Admin":
              return StaffRole.ADMIN;
            case "StaffAdmin":
              return StaffRole.STAFF_ADMIN;
            case "Staff":
              return StaffRole.STAFF;
            default:
              return StaffRole.GUEST;
          }
        }))(),
    });
    setLoading(false);
  }, [user]);

  const isCognitoUserRole = (role: StaffRole) => {
    if (!cognitoUser) {
      return false;
    }

    return cognitoUser.roles.includes(role);
  };

  return { loading, cognitoUser, isCognitoUserRole };
}
