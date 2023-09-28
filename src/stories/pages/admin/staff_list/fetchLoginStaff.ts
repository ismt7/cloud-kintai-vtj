import { UseAuthenticator } from "@aws-amplify/ui-react";
import { Service, Staff } from "../../../../client";

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

export default fetchLoginStaff;
