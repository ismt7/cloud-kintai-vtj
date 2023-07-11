import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Configuration, MasterApi } from "../../../api";

import { GetConfiguration } from "../../time_recorder/TimeRecorderAPI";
import {
  mappedOriginWorkPeriodPerMonth,
  OriginWorkPeriodPerMonth,
} from "./FetchWorkPeriodPerMonth";

dayjs.extend(utc);

export enum JobTermStatus {
  NO_REGISTER = "NO_REGISTER",
  NO_SYNCED = "NO_SYNCED",
  SYNCED = "REGISTERED",
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
    // dayjs()で月初を取得
    const beginOfMonth = dayjs(
      new Date(targetDate.year(), targetDate.month(), 1)
    ).format("YYYYMMDD");

    const workPeriods = await fetchWorkPeriodPerMonth(
      GetConfiguration(),
      beginOfMonth
    )
      .then((r) => r)
      .catch(() => null);

    console.log("workPeriods", workPeriods);

    if (!workPeriods) return [];

    const startYear = targetDate.subtract(1, "year").year();
    const endYear = targetDate.add(1, "year").year();

    const jobTermList: JobTermList[] = [];
    for (let targetYear = startYear; targetYear <= endYear; targetYear += 1) {
      for (let targetMonth = 0; targetMonth < 12; targetMonth += 1) {
        const defaultTargetMonth = dayjs()
          .year(targetYear)
          .month(targetMonth)
          .day(1)
          .format("YYYYMM");

        const defaultJobStartDate = dayjs(
          new Date(targetYear, targetMonth, 1)
        ).format("YYYY-MM-DD");

        const defaultJobEndDate = dayjs(
          new Date(targetYear, targetMonth + 1, 0)
        ).format("YYYY-MM-DD");

        const matchWorkPeriod = workPeriods?.find(
          (workPeriod) => workPeriod.targetMonth === defaultTargetMonth
        );

        const newJobTerm = ((): JobTermList => {
          if (matchWorkPeriod) {
            return {
              id: targetMonth,
              targetMonth: matchWorkPeriod.targetMonth ?? defaultTargetMonth,
              jobStartDate:
                dayjs(matchWorkPeriod.jobStartDate).format("YYYY-MM-DD") ?? "",
              jobEndDate:
                dayjs(matchWorkPeriod.jobEndDate).format("YYYY-MM-DD") ?? "",
              status: JobTermStatus.SYNCED,
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
