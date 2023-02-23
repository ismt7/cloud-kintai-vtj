// cspell: words reduxjs
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Configuration, StaffApi } from "../../api";

const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async ({ staffId }: { staffId: number }) => {
    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });
    const staffApi = new StaffApi(conf);
    const deletedStaff = await staffApi
      .deleteStaff({ staffId })
      .then(() => true)
      .catch(() => false);

    return deletedStaff;
  }
);
export default deleteStaff;
