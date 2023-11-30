import { useEffect, useState } from "react";
import { Staff } from "./common";
import fetchStaffs from "./fetchStaffs";

export default function useStaffs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [staffs, setStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    void fetchStaffs()
      .then((res) => {
        setStaffs(res);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    error,
    staffs,
  };
}
