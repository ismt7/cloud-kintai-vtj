import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Rest, RestCreate, Service, Staff } from "../../../client";
import fetchRests from "../fetchRests";

export default function useRests(
  staff: Staff | null,
  targetWorkDate: string | undefined
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [rests, setRests] = useState<Rest[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fromDate = dayjs(targetWorkDate);
  const toDate = fromDate;

  useEffect(() => {
    if (!staff || !targetWorkDate) return;

    setLoading(true);
    setError(null);
    void fetchRests(staff.id, fromDate, toDate)
      .then((value) => {
        setRests(value);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [staff, targetWorkDate]);

  const createRest = async (newRest: RestCreate) => {
    if (!staff) throw new Error("staff is not found");

    return Service.createRest(newRest, staff.id)
      .then((res) => {
        setRests([...rests, res]);
        return res;
      })
      .catch((e) => {
        throw e;
      });
  };

  const updateRest = async (updatedRest: Rest) => {
    if (!staff) {
      throw new Error("staff is not found");
    }

    return Service.updateRest(
      updatedRest.id,
      {
        staff_id: updatedRest.staff_id,
        work_date: updatedRest.work_date,
        start_time: updatedRest.start_time,
        end_time: updatedRest.end_time,
      },
      staff.id
    )
      .then((res) => {
        setRests(
          rests.map((rest) => {
            if (rest.id === res.id) {
              return res;
            }
            return rest;
          })
        );
        return res;
      })
      .catch((e) => {
        throw e;
      });
  };

  const deleteRest = async (deletedRest: Rest) => {
    if (!staff) {
      throw new Error("staff is not found");
    }

    return Service.deleteRest(deletedRest.id, staff.id)
      .then(() => {
        setRests(rests.filter((rest) => rest.id !== deletedRest.id));
      })
      .catch((e) => {
        throw e;
      });
  };

  return { rests, loading, error, createRest, updateRest, deleteRest };
}
