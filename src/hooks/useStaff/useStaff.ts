import { useEffect, useState } from "react";
import { mappingStaffRole, StaffType } from "../useStaffs/useStaffs";
import fetchStaff from "./fetchStaff";

export default function useStaff() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [staff, setStaff] = useState<StaffType | null>(null);

  useEffect(() => {}, []);
}
