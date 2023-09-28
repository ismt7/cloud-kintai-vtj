import { Box, Container, Stack } from "@mui/material";

import { UseAuthenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Service, Staff } from "../../client";
import StaffForm from "../../components/staff_form/StaffForm";
import StaffList, { LoginStaff } from "../../components/staff_list/StaffList";

async function fetchLoginStaff(
  user: UseAuthenticator["user"],
  callback: (value: Staff | null) => void
) {
  const SYSTEM_STAFF_ID = 1;

  const cognitoUserId = user?.attributes?.sub;

  if (!cognitoUserId) {
    callback(null);
    return;
  }

  const staff = await Service.getStaffByCognitoUserId(
    cognitoUserId,
    SYSTEM_STAFF_ID
  ).catch((error) => {
    console.log(error);
    return null;
  });

  callback(staff);
}

export default function AdminStaff() {
  const { route, user } = useAuthenticator();
  const navigate = useNavigate();

  const [loginStaff, setLoginStaff] = useState<LoginStaff>(null);

  useEffect(() => {
    if (route !== "idle" && route !== "authenticated") {
      navigate("/login");
    }
  }, [route]);

  useEffect(() => {
    if (!user) return;

    void fetchLoginStaff(user, (value) => setLoginStaff(value));
  }, [user]);

  return (
    <Container maxWidth="xl" sx={{ height: 1, pt: 2 }}>
      <Stack direction="row" sx={{ height: 1 }}>
        <Box sx={{ width: "350px", height: 1 }}>
          <StaffList loginStaff={loginStaff} />
        </Box>
        <Box sx={{ p: 5, flexGrow: 1 }}>
          <StaffForm loginStaff={loginStaff} />
        </Box>
      </Stack>
    </Container>
  );
}
