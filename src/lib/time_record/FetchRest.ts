import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { Configuration, Rest, RestApi } from "../../api";

export interface OriginRest
  extends Omit<Rest, "workDate" | "startTime" | "endTime"> {
  workDate: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
}

const isNullDate = (date?: Date) => {
  const nullDate = dayjs(0);
  const targetDate = dayjs(date || 0);

  return nullDate.isSame(targetDate);
};

export const mappedOriginRest = (rest: Rest): OriginRest => ({
  restTimeId: rest.restTimeId,
  parentRestTimeId: rest.parentRestTimeId,
  staffId: rest.staffId,
  workDate: isNullDate(rest.workDate)
    ? undefined
    : dayjs(rest.workDate).toISOString(),
  startTime: isNullDate(rest.startTime)
    ? undefined
    : dayjs(rest.startTime).toISOString(),
  endTime: isNullDate(rest.endTime)
    ? undefined
    : dayjs(rest.endTime).toISOString(),
});

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
