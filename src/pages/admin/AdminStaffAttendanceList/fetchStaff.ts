import { Service, Staff } from "../../../client";

const ADMIN_STAFF_ID = 1;

export default async function fetchStaff(staffId: Staff["id"]) {
  const staff = await Service.getStaff(staffId, ADMIN_STAFF_ID).catch(
    (error) => {
      throw error;
    }
  );

  return staff;
}
