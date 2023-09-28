import { Service } from "../../client";
import { LoginStaff } from "../staff_list/StaffList";

async function fetchStaff(loginStaff: LoginStaff, targetStaffId: number) {
  if (!loginStaff) {
    throw new Error("Not logged in.");
  }

  const staff = await Service.getStaff(targetStaffId, loginStaff.id).catch(
    (error) => {
      throw error;
    }
  );

  return staff;
}

export default fetchStaff;
