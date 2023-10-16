import { useEffect, useState } from "react";
import { Staff } from "../../../client";
import { LoginStaff } from "../../staff_list/StaffList";
import fetchStaff from "../fetchStaff";

function useStaff(loginStaff: LoginStaff, targetStaffId: string | undefined) {
  const [loading, setLoading] = useState<boolean>(false);
  const [staff, setStaff] = useState<Staff | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!loginStaff || !targetStaffId) return;

    setLoading(true);
    void fetchStaff(loginStaff, Number(targetStaffId))
      .then((value) => {
        setStaff(value);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e);
        setLoading(false);
      });
  }, [loginStaff, targetStaffId]);

  return { staff, loading, error };
}

export default useStaff;
