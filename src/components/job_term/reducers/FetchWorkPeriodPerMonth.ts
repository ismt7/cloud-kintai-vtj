import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { MasterApi, WorkPeriodPerMonth } from "../../../api";

export interface OriginWorkPeriodPerMonth
  extends Omit<
    WorkPeriodPerMonth,
    "targetMonth" | "jobStartDate" | "jobEndDate"
  > {
  targetMonth: string | undefined;
  jobStartDate: string | undefined;
  jobEndDate: string | undefined;
}

const isNullDate = (date: Date) => {
  const nullDate = dayjs(0);
  const targetDate = dayjs(date);

  return nullDate.isSame(targetDate);
};

export const mappedOriginWorkPeriodPerMonth = (
  workPeriodPerMonth: WorkPeriodPerMonth
): OriginWorkPeriodPerMonth => ({
  workPeriodPerMonthId: workPeriodPerMonth.workPeriodPerMonthId,
  targetMonth: workPeriodPerMonth.targetMonth,
  jobStartDate: isNullDate(workPeriodPerMonth.jobStartDate)
    ? undefined
    : dayjs(workPeriodPerMonth.jobStartDate).toISOString(),
  jobEndDate: isNullDate(workPeriodPerMonth.jobEndDate)
    ? undefined
    : dayjs(workPeriodPerMonth.jobEndDate).toISOString(),
});

const fetchWorkPeriodPerMonth = createAsyncThunk(
  "workPeriodPerMonth/fetchWorkPeriodPerMonth",
  async ({ date }: { date: string }) => {
    const api = new MasterApi();
    const workPeriods = await api
      .getWorkPeriodPerMonthList({
        date,
      })
      .then((r) => r)
      .catch(() => null);

    if (!workPeriods) return null;

    try {
      const convertedWorkPeriods = workPeriods.map((workPeriod) =>
        mappedOriginWorkPeriodPerMonth(workPeriod)
      );

      return convertedWorkPeriods;
    } catch (error) {
      return null;
    }
  }
);
export default fetchWorkPeriodPerMonth;
