import { useEffect, useState } from "react";
import { Service, Staff, StaffUpdate } from "../client";

const ADMIN_STAFF_ID = 1;

export default function useStaffs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [staffs, setStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Service.getStaffs(ADMIN_STAFF_ID)
      .then((res) => {
        setStaffs(res);
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateStaff = (staffId: number, requestBody: StaffUpdate) =>
    Service.updateStaff(staffId, requestBody, ADMIN_STAFF_ID)
      .then((res) => {
        const newStaffs = staffs.map((staff) => {
          if (staff.id === staffId) {
            return res;
          }
          return staff;
        });
        setStaffs(newStaffs);
        return res;
      })
      .catch((err) => {
        throw err;
      });

  return {
    loading,
    error,
    staffs,
    updateStaff,
  };
}
