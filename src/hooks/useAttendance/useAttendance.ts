import dayjs from "dayjs";
import { useState } from "react";

import {
  Attendance,
  CreateAttendanceInput,
  RestInput,
  UpdateAttendanceInput,
} from "../../API";
import fetchAttendance from "../common/fetchAttendance";
import createAttendanceData from "./createAttendanceData";
import updateAttendanceData from "./updateAttendanceData";

export enum GoDirectlyFlag {
  YES,
  NO,
}

export enum ReturnDirectlyFlag {
  YES,
  NO,
}

export default function useAttendance() {
  const [attendance, setAttendance] = useState<Attendance | undefined | null>(
    undefined
  );

  const getAttendance = async (staffId: string, workDate: string) =>
    fetchAttendance(staffId, workDate)
      .then((res) => {
        setAttendance(res);
        return res;
      })
      .catch((e: Error) => {
        throw e;
      });

  const createAttendance = async (input: CreateAttendanceInput) => {
    const { staffId, workDate } = input;
    await getAttendance(staffId, workDate)
      .then((res) => {
        if (res) {
          throw new Error("Attendance already exists");
        }
      })
      .catch((e: Error) => {
        throw e;
      });

    return createAttendanceData(input)
      .then((res) => {
        setAttendance(res);
        return res;
      })
      .catch((e: Error) => {
        throw e;
      });
  };

  const updateAttendance = async (input: UpdateAttendanceInput) =>
    updateAttendanceData(input)
      .then((res) => {
        setAttendance(res);
        return res;
      })
      .catch((e: Error) => {
        throw e;
      });

  const clockIn = async (
    staffId: string,
    workDate: string,
    startTime: string,
    goDirectlyFlag = GoDirectlyFlag.NO
  ) => {
    if (attendance) {
      return updateAttendance({
        id: attendance.id,
        startTime,
        goDirectlyFlag: goDirectlyFlag === GoDirectlyFlag.YES,
        revision: attendance.revision,
      }).catch((e: Error) => {
        throw e;
      });
    }

    return createAttendance({
      staffId,
      workDate,
      startTime,
      goDirectlyFlag: goDirectlyFlag === GoDirectlyFlag.YES,
    }).catch((e: Error) => {
      throw e;
    });
  };

  const clockOut = async (
    staffId: string,
    workDate: string,
    endTime: string,
    returnDirectlyFlag = ReturnDirectlyFlag.NO
  ) => {
    if (attendance) {
      const startTime = dayjs(attendance.startTime);
      // eslint-disable-next-line newline-per-chained-call
      const noon = dayjs().hour(12).minute(0).second(0).millisecond(0);
      const isBeforeNoon = startTime.isBefore(noon);

      const rests = (() => {
        if (!isBeforeNoon) {
          return [];
        }

        const prevRests = attendance.rests
          ? attendance.rests
              .filter((item): item is NonNullable<typeof item> => item !== null)
              .map(
                (item): RestInput => ({
                  startTime: item.startTime,
                  endTime: item.endTime,
                })
              )
          : [];

        const lunchBreakStart = dayjs()
          .hour(12)
          .minute(0)
          .second(0)
          .millisecond(0);
        const lunchBreakEnd = dayjs()
          .hour(13)
          .minute(0)
          .second(0)
          .millisecond(0);

        const isAlreadyExist = prevRests.filter((rest) => {
          if (!rest.startTime || !rest.endTime) {
            return false;
          }

          const restStart = dayjs(rest.startTime);
          const restEnd = dayjs(rest.endTime);

          return (
            restStart.isSame(lunchBreakStart) && restEnd.isSame(lunchBreakEnd)
          );
        });

        if (isAlreadyExist.length > 0) {
          return prevRests;
        }

        prevRests.push({
          startTime: lunchBreakStart.toISOString(),
          endTime: lunchBreakEnd.toISOString(),
        });

        return prevRests;
      })();

      return updateAttendance({
        id: attendance.id,
        endTime,
        returnDirectlyFlag: returnDirectlyFlag === ReturnDirectlyFlag.YES,
        rests,
        revision: attendance.revision,
      }).catch((e: Error) => {
        throw e;
      });
    }

    return createAttendance({
      staffId,
      workDate,
      endTime,
      returnDirectlyFlag: returnDirectlyFlag === ReturnDirectlyFlag.YES,
    }).catch((e: Error) => {
      throw e;
    });
  };

  const restStart = async (
    staffId: string,
    workDate: string,
    startTime: string
  ) => {
    if (attendance) {
      if (!attendance.startTime) {
        throw new Error("Not clocked in");
      }

      const rests = attendance.rests
        ? attendance.rests
            .filter((item): item is NonNullable<typeof item> => item !== null)
            .map(
              (item): RestInput => ({
                startTime: item.startTime,
                endTime: item.endTime,
              })
            )
        : [];

      const isMismatch =
        rests.filter((rest) => !rest.startTime || !rest.endTime).length > 0;
      if (isMismatch) {
        throw new Error("There is a problem with the rest time");
      }

      rests.push({ startTime });

      return updateAttendance({
        id: attendance.id,
        rests,
        revision: attendance.revision,
      }).catch((e: Error) => {
        throw e;
      });
    }

    return createAttendance({
      staffId,
      workDate,
      rests: [
        {
          startTime,
        },
      ],
    }).catch((e: Error) => {
      throw e;
    });
  };

  const restEnd = async (
    staffId: string,
    workDate: string,
    endTime: string
  ) => {
    if (attendance) {
      if (!attendance.startTime) {
        throw new Error("Not clocked in");
      }

      const rests = attendance.rests
        ? attendance.rests
            .filter((item): item is NonNullable<typeof item> => item !== null)
            .map(
              (item): RestInput => ({
                startTime: item.startTime,
                endTime: item.endTime,
              })
            )
        : [];

      if (rests.length === 0) {
        throw new Error("There is no rest start");
      }

      const isMismatch =
        rests.filter((rest) => !rest.startTime || !rest.endTime).length >= 2;

      if (isMismatch) {
        throw new Error("There is a problem with the rest time");
      }

      const isLatestMismatch = !rests[rests.length - 1].startTime;

      if (isLatestMismatch) {
        throw new Error("There is a problem with the rest time");
      }

      rests[rests.length - 1].endTime = endTime;

      return updateAttendance({
        id: attendance.id,
        rests,
        revision: attendance.revision,
      }).catch((e: Error) => {
        throw e;
      });
    }

    return createAttendance({
      staffId,
      workDate,
      rests: [
        {
          endTime,
        },
      ],
    }).catch((e: Error) => {
      throw e;
    });
  };

  const updateRemarks = async (
    staffId: string,
    workDate: string,
    remarks: string
  ) => {
    if (attendance) {
      return updateAttendance({
        id: attendance.id,
        remarks,
        revision: attendance.revision,
      }).catch((e: Error) => {
        throw e;
      });
    }

    return createAttendance({
      staffId,
      workDate,
      remarks,
    }).catch((e: Error) => {
      throw e;
    });
  };

  return {
    attendance,
    getAttendance,
    createAttendance,
    updateAttendance,
    clockIn,
    clockOut,
    restStart,
    restEnd,
    updateRemarks,
  };
}
