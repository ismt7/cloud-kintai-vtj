import { Service } from "../../client";

async function fetchLoginStaff(cognitoUserId: string) {
  const SYSTEM_STAFF_ID = 1;

  const staff = await Service.getStaffByCognitoUserId(
    cognitoUserId,
    SYSTEM_STAFF_ID
  ).catch((error) => {
    throw error;
  });

  return staff;
}

export default fetchLoginStaff;
