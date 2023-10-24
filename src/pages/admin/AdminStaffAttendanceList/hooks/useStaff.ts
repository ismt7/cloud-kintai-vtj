import { useEffect, useState } from "react";
import { Staff } from "../../../../client";
import fetchStaff from "../fetchStaff";

export default function useStaff(staffId: Staff["id"] | undefined) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [staff, setStaff] = useState<Staff | null>(null);

  useEffect(() => {
    if (!staffId) {
      return;
    }

    setLoading(true);
    setError(null);

    fetchStaff(staffId)
      .then((data) => {
        setStaff(data);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [staffId]);

  return {
    loading,
    error,
    staff,
  };
}
