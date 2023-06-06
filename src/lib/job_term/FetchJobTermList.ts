import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { Configuration, MasterApi } from "../../api";

import {
  mappedOriginWorkPeriodPerMonth,
  OriginWorkPeriodPerMonth,
} from "./FetchWorkPeriodPerMonth";

export enum JobTermStatus {
  NO_REGISTER = "NO_REGISTER",
  REGISTERED = "REGISTERED",
}

export interface JobTermList {
  id: number;
  targetMonth: string;
  jobStartDate: string;
  jobEndDate: string;
  status: JobTermStatus;
}

async function fetchWorkPeriodPerMonth(
  conf: Configuration,
  targetDate: string
): Promise<OriginWorkPeriodPerMonth[] | null> {
  const api = new MasterApi(conf);
  const workPeriods = await api
    .getWorkPeriodPerMonthList({
      date: targetDate,
    })
    .then((r) => r)
    .catch(() => null);

  if (!workPeriods) return null;

  try {
    return workPeriods.map((workPeriod) =>
      mappedOriginWorkPeriodPerMonth(workPeriod)
    );
  } catch (error) {
    return null;
  }
}

const fetchJobTermList = createAsyncThunk(
  "jobTermList/fetchJobTermList",
  async ({
    targetDate,
  }: {
    targetDate: dayjs.Dayjs;
  }): Promise<JobTermList[]> => {
    const conf = new Configuration({
      basePath: process.env.REACT_APP_BASE_PATH,
    });

    const workPeriods = await fetchWorkPeriodPerMonth(
      conf,
      dayjs(new Date(targetDate.year(), targetDate.month(), 1)).format(
        "YYYYMMDD"
      )
    )
      .then((r) => r)
      .catch(() => null);

    if (!workPeriods) return [];

    const startYear = targetDate.subtract(1, "year").year();
    const endYear = targetDate.add(1, "year").year();

    const jobTermList: JobTermList[] = [];
    for (let targetYear = startYear; targetYear <= endYear; targetYear += 1) {
      for (let targetMonth = 0; targetMonth < 12; targetMonth += 1) {
        const defaultTargetMonth = dayjs(
          new Date(targetYear, targetMonth, 1)
        ).format("YYYY-MM-DD");

        const defaultJobStartDate = dayjs(
          new Date(targetYear, targetMonth, 1)
        ).format("YYYY-MM-DD");

        const defaultJobEndDate = dayjs(
          new Date(targetYear, targetMonth + 1, 0)
        ).format("YYYY-MM-DD");

        const matchWorkPeriod = workPeriods?.find(
          (workPeriod) =>
            dayjs(workPeriod.targetMonth).format("YYYY-MM-DD") ===
            defaultTargetMonth
        );

        const newJobTerm = ((): JobTermList => {
          if (matchWorkPeriod) {
            return {
              id: targetMonth,
              targetMonth:
                dayjs(matchWorkPeriod.targetMonth).format("YYYY-MM-DD") ?? "",
              jobStartDate:
                dayjs(matchWorkPeriod.jobStartDate).format("YYYY-MM-DD") ?? "",
              jobEndDate:
                dayjs(matchWorkPeriod.jobEndDate).format("YYYY-MM-DD") ?? "",
              status: JobTermStatus.REGISTERED,
            };
          }

          return {
            id: targetMonth,
            targetMonth: defaultTargetMonth,
            jobStartDate: defaultJobStartDate,
            jobEndDate: defaultJobEndDate,
            status: JobTermStatus.NO_REGISTER,
          };
        })();

        jobTermList.push(newJobTerm);
      }
    }

    return jobTermList;
  }
);
export default fetchJobTermList;
