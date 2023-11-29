import { useEffect, useState } from "react";
import { Service, Staff, StaffUpdate } from "../client";

const ADMIN_STAFF_ID = 1;

export default function useStaff(staffId: Staff["id"] | undefined) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [staff, setStaff] = useState<Staff | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (!staffId) {
      return;
    }

    Service.getStaff(staffId, ADMIN_STAFF_ID)
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchStaff = () => {
    if (!staffId) {
      throw new Error("Staff ID is not found");
    }

    return Service.getStaff(staffId, ADMIN_STAFF_ID)
      .then((res) => {
        setStaff(res);
        return res;
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  const updateStaff = (input: StaffUpdate) => {
    if (!staff) {
      throw new Error("Staff is not found");
    }

    return Service.updateStaff(staff.id, input, ADMIN_STAFF_ID)
      .then((res) => {
        setStaff(res);
        return res;
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  return {
    loading,
    error,
    staff,
    fetchStaff,
    updateStaff,
  };
}
