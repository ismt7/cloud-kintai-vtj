import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { Configuration, Rest, RestApi } from "../../api";

export interface OriginRest extends Omit<Rest, "workDate"> {
  workDate: string;
}

export const mappedOriginRest = (rest: Rest): OriginRest => ({
  restTimeId: rest.restTimeId,
  parentRestTimeId: rest.parentRestTimeId,
  staffId: rest.staffId,
  workDate: dayjs(rest.workDate).format("YYYYMMDD"),
  startTime: rest.startTime || "",
  endTime: rest.endTime || "",
});

const fetchRest = createAsyncThunk(
  "timeRecord/fetchRest",
  async ({ staffId, workDate }: { staffId: number; workDate: number }) => {
    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });

    const restApi = new RestApi(conf);
    const rest = await restApi
      .readRestRestsStaffIdWorkDateGet({
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
