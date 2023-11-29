import { useEffect, useState } from "react";
import { Service, StaffRole } from "../client";

const ADMIN_STAFF_ID = 1;

export default function useStaffRoles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [staffRoles, setStaffRoles] = useState<StaffRole[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Service.getStaffRoles(ADMIN_STAFF_ID)
      .then((res) => {
        setStaffRoles(res);
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    error,
    staffRoles,
  };
}
