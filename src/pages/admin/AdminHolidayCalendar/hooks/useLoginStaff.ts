import { useEffect, useState } from "react";
import { Service } from "../../../../client";
import { LoginStaff } from "../../../../components/staff_list/StaffList";

function useLoginStaff(cognitoUserId: string | undefined) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginStaff, setLoginStaff] = useState<LoginStaff | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!cognitoUserId) return;

    setLoading(true);
    setError(null);
    void Service.getStaffByCognitoUserId(cognitoUserId, 1)
      .then((response) => {
        setLoginStaff(response);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cognitoUserId]);

  return { loading, loginStaff, error };
}

export default useLoginStaff;
