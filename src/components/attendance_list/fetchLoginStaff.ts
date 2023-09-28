import { Service } from "../../client";

async function fetchLoginStaff(cognitoUserId: string) {
  const SYSTEM_STAFF_ID = 1;

  if (!cognitoUserId) {
    throw new Error("cognitoUserId is not defined");
  }

  const staff = await Service.getStaffByCognitoUserId(
    cognitoUserId,
    SYSTEM_STAFF_ID
  ).catch((error) => {
    throw error;
  });

  return staff;
}

export default fetchLoginStaff;
