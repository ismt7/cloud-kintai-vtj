import { useEffect, useState } from "react";
import { LoginStaff } from "../../staff_list/StaffList";
import fetchLoginStaff from "../fetchLoginStaff";

function useLoginStaff(cognitoUserId: string | undefined) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginStaff, setLoginStaff] = useState<LoginStaff>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!cognitoUserId) return;

    setLoading(true);
    setError(null);
    void fetchLoginStaff(cognitoUserId)
      .then((value) => {
        setLoginStaff(value);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cognitoUserId]);

  return { loginStaff, loading, error };
}

export default useLoginStaff;
