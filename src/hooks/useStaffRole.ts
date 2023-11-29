import { useEffect, useState } from "react";
import { Service, Staff, StaffRole } from "../client";

const ADMIN_STAFF_ID = 1;

export default function useStaffRole(staffId: Staff["id"] | undefined) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [staffRole, setStaffRole] = useState<StaffRole | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (!staffId) {
      return;
    }

    Service.getStaffRole(staffId, ADMIN_STAFF_ID)
      .then((res) => {
        setStaffRole(res);
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchStaffRole = () => {
    if (!staffId) {
      throw new Error("Staff ID is not found");
    }

    return Service.getStaffRole(staffId, ADMIN_STAFF_ID)
      .then((res) => {
        setStaffRole(res);
        return res;
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  return {
    loading,
    error,
    staffRole,
    fetchStaffRole,
  };
}
