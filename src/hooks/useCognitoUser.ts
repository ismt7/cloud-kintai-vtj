import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

interface CognitoUser {
  id: string;
}

export default function useCognitoUser() {
  const { user } = useAuthenticator();
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    if (user.attributes?.sub) {
      setCognitoUser({
        id: user.attributes.sub,
      });
    }
  }, [user.attributes?.sub]);

  return { cognitoUser };
}
