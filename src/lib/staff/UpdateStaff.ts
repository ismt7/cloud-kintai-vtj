import { createAsyncThunk } from "@reduxjs/toolkit";
import { Configuration, Staff, StaffApi } from "../../api";

const updateStaff = createAsyncThunk(
  "staff/updateStaff",
  async ({ staff }: { staff: Staff }) => {
    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });
    const staffApi = new StaffApi(conf);
    const updatedStaff = await staffApi
      .updateStaff({
        staffId: staff.staffId,
        staffUpdate: {
          lastName: staff.lastName,
          firstName: staff.firstName,
          mailAddress: staff.mailAddress,
          iconPath: staff.iconPath,
        },
      })
      .then((r) => r)
      .catch(() => undefined);

    return updatedStaff;
  }
);
export default updateStaff;
