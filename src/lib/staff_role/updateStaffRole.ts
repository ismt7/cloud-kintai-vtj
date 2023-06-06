import { createAsyncThunk } from "@reduxjs/toolkit";

import { Configuration, StaffRoleApi } from "../../api";

const updateStaffRole = createAsyncThunk(
  "staffRole/updateStaffRole",
  async ({ staffId, roleId }: { staffId: number; roleId: number }) => {
    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });
    const staffRoleApi = new StaffRoleApi(conf);
    const updatedStaffRole = await staffRoleApi
      .updateStaffRoleById({
        staffId,
        staffRoleUpdate: {
          roleId,
        },
      })
      .then((r) => r)
      .catch(() => undefined);

    return updatedStaffRole;
  }
);
export default updateStaffRole;
