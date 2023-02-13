import { createAsyncThunk } from "@reduxjs/toolkit";
import { Configuration, RestApi } from "../../api";
import { mappedOriginRest } from "./FetchRest";

const registerRestStart = createAsyncThunk(
  "timeRecord/registerRestStart",
  async ({
    staffId,
    workDate,
    startTime,
  }: {
    staffId: number | undefined;
    workDate: number;
    startTime: string;
  }) => {
    if (!staffId) return null;

    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });
    const restApi = new RestApi(conf);
    const rest = await restApi
      .registerStartRestRestsStaffIdWorkDateStartPost({
        staffId,
        workDate,
        restStart: {
          startTime,
        },
      })
      .then((r) => r)
      .catch(() => null);

    if (rest === null) return null;

    return mappedOriginRest(rest);
  }
);
export default registerRestStart;
