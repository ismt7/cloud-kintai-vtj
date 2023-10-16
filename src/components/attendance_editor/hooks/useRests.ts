import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Rest, Staff } from "../../../client";
import fetchRests from "../fetchRests";

function useRests(staff: Staff | null, targetWorkDate: string | undefined) {
  const [loading, setLoading] = useState<boolean>(false);
  const [rests, setRests] = useState<Rest[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fromDate = dayjs(targetWorkDate);
  const toDate = fromDate;

  useEffect(() => {
    if (!staff || !targetWorkDate) return;

    setLoading(true);
    void fetchRests(staff.id, fromDate, toDate)
      .then((value) => {
        setRests(value);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e);
        setLoading(false);
      });
  }, [staff, targetWorkDate]);

  return { rests, loading, error };
}

export default useRests;
