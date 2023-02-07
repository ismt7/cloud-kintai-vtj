import { createAsyncThunk } from "@reduxjs/toolkit";
import { Configuration, RestApi } from "../../api";

const fetchRest = createAsyncThunk(
  "timeRecord/fetchRest",
  async ({ staffId, workDate }: { staffId: number; workDate: number }) => {
    const conf = new Configuration({
      basePath: process.env.BASE_PATH,
    });

    const restApi = new RestApi(conf);
    const rest = await restApi
      .readRestRestsStaffIdWorkDateGet({
        staffId,
        workDate,
      })
      .then((r) => r)
      .catch(() => undefined);

    return rest;
  }
);
export default fetchRest;
