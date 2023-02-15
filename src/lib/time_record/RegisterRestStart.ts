import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
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
      .registerStartRest({
        staffId,
        workDate,
        restStart: {
          startTime: dayjs(startTime).toDate(),
        },
      })
      .then((r) => r)
      .catch(() => null);

    if (rest === null) return null;

    return mappedOriginRest(rest);
  }
);
export default registerRestStart;
