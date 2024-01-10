import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

interface CognitoUser {
  id: string;
  givenName: string;
  familyName: string;
  mailAddress: string;
  roles: UserRole[];
}

export enum UserRole {
  Admin = "Admin",
  StaffAdmin = "StaffAdmin",
  Staff = "Staff",
  Guest = "Guest",
}

export default function useCognitoUser() {
  const { user } = useAuthenticator();
  const [loading, setLoading] = useState(false);
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    setLoading(true);
    if (!user) {
      return;
    }

    const userAttributes = user.attributes;
    if (!userAttributes) {
      return;
    }

    const { sub: id } = userAttributes;

    const signInUserSession = user.getSignInUserSession();
    if (!signInUserSession) {
      return;
    }

    const idToken = signInUserSession.getIdToken();
    const userGroups = idToken.payload["cognito:groups"] as string[];

    if (user?.attributes?.sub) {
      setCognitoUser({
        id,
        givenName: user.attributes.given_name,
        familyName: user.attributes.family_name,
        mailAddress: user.attributes.email,
        roles: (() =>
          userGroups.map((group) => {
            switch (group) {
              case "Admin":
                return UserRole.Admin;
              case "StaffAdmin":
                return UserRole.StaffAdmin;
              case "Staff":
                return UserRole.Staff;
              default:
                return UserRole.Guest;
            }
          }))(),
      });
    }
    setLoading(false);
  }, [user]);

  const isCognitoUserRole = (role: UserRole) => {
    if (!cognitoUser) {
      return false;
    }

    return cognitoUser.roles.includes(role);
  };

  return { loading, cognitoUser, isCognitoUserRole };
}
