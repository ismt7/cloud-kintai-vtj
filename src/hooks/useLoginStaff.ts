import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { Service, Staff } from "../client";

const ADMIN_STAFF_ID = 1;

export default function useLoginStaff() {
  const { user } = useAuthenticator();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loginStaff, setLoginStaff] = useState<Staff | null>(null);

  useEffect(() => {
    const cognitoUserId = user?.attributes?.sub;
    if (!cognitoUserId) {
      return;
    }

    setLoading(true);
    setError(null);
    Service.getStaffByCognitoUserId(cognitoUserId, ADMIN_STAFF_ID)
      .then((res) => {
        setLoginStaff(res);
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return {
    loading,
    error,
    loginStaff,
  };
}
