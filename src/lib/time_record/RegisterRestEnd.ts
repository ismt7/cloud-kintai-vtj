import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { Configuration, RestApi } from "../../api";
import { mappedOriginRest } from "../../components/time_recorder/TimeRecorderAPI";

const registerRestEnd = createAsyncThunk(
  "timeRecord/registerRestEnd",
  async ({
    staffId,
    workDate,
    endTime,
  }: {
    staffId: number | undefined;
    workDate: number;
    endTime: string;
  }) => {
    if (!staffId) return null;

    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });
    const restApi = new RestApi(conf);
    const rest = await restApi
      .registerEndRest({
        staffId,
        workDate,
        restEnd: {
          endTime: dayjs(endTime).toDate(),
        },
      })
      .then((r) => r)
      .catch(() => null);

    if (rest === null) return null;

    return mappedOriginRest(rest);
  }
);
export default registerRestEnd;
