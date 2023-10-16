import { useEffect, useState } from "react";
import { Service } from "../../../client";
import useCognitoUser from "../../../hooks/useCognitoUser";
import { LoginStaff } from "../../staff_list/StaffList";

const SYSTEM_STAFF_ID = 1;

export default function useLoginStaff() {
  const { cognitoUser } = useCognitoUser();
  const [loginStaff, setLoginStaff] = useState<LoginStaff | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!cognitoUser) return;

    setLoading(true);
    Service.getStaffByCognitoUserId(cognitoUser.id, SYSTEM_STAFF_ID)
      .then((staff) => {
        setLoginStaff(staff);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cognitoUser]);

  return { loginStaff, loading };
}
