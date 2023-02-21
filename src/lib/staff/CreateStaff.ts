import { createAsyncThunk } from "@reduxjs/toolkit";
import { Configuration, StaffApi, StaffCreate } from "../../api";

const createStaff = createAsyncThunk(
  "staff/createStaff",
  async ({ staffCreate }: { staffCreate: StaffCreate }) => {
    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });
    const staffApi = new StaffApi(conf);
    const staff = await staffApi
      .createStaff({ staffCreate })
      .then((r) => r)
      .catch(() => undefined);

    return staff;
  }
);
export default createStaff;
