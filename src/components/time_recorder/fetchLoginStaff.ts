import { Service, Staff } from "../../client";

async function fetchLoginStaff(
  cognitoUserId: string,
  callback: (value: Staff | null) => void
) {
  const SYSTEM_STAFF_ID = 1;

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
