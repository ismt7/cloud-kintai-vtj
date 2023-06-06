import { createAsyncThunk } from "@reduxjs/toolkit";

import { Configuration, Rest, RestApi } from "../../api";
// eslint-disable-next-line import/no-cycle
import { mappedOriginRest } from "../../components/time_recorder/TimeRecorderAPI";

export interface OriginRest
  extends Omit<Rest, "workDate" | "startTime" | "endTime"> {
  workDate: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
}

const fetchRest = createAsyncThunk(
  "timeRecord/fetchRest",
  async ({ staffId, workDate }: { staffId: number; workDate: number }) => {
    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });

    const restApi = new RestApi(conf);
    const rest = await restApi
      .getRest({
        staffId,
        workDate,
      })
      .then((r) => r)
      .catch(() => null);

    if (rest?.staffId === undefined) return null;

    if (rest === null) return null;

    return mappedOriginRest(rest);
  }
);
export default fetchRest;
