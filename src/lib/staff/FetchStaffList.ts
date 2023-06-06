import { createAsyncThunk } from "@reduxjs/toolkit";

import { Configuration, StaffApi } from "../../api";

const fetchStaffList = createAsyncThunk(
  "staffList/fetchStaffList",
  async () => {
    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });
    const staffApi = new StaffApi(conf);
    const staffList = await staffApi
      .getStaffs({
        skip: 0,
        limit: 100,
      })
      .then((r) => r)
      .catch(() => undefined);

    return staffList;
  }
);
export default fetchStaffList;
