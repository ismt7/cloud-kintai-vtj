import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../Layout";
import { StaffRole } from "../../hooks/useStaffs/useStaffs";
import NotFound from "../NotFound";

export default function AdminLayout() {
  const { isCognitoUserRole } = useContext(AuthContext);

  if (!isCognitoUserRole(StaffRole.ADMIN)) {
    return <NotFound />;
  }

  return <Outlet />;
}
