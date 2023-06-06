import { createAsyncThunk } from "@reduxjs/toolkit";

import { Configuration, StaffApi } from "../../api";

const fetchStaff = createAsyncThunk(
  "loginStaff/fetchStaff",
  async ({ mailAddress }: { mailAddress: string }) => {
    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });
    const staffApi = new StaffApi(conf);
    const staff = await staffApi
      .getStaffByMailAddress({ mailAddress })
      .then((r) => r)
      .catch(() => undefined);

    return staff;
  }
);
export default fetchStaff;
