import { useEffect, useState } from "react";
import { Role, Service } from "../client";

const ADMIN_STAFF_ID = 1;

export default function useRoles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Service.getRoles(ADMIN_STAFF_ID)
      .then((res) => {
        setRoles(res);
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
    roles,
  };
}
