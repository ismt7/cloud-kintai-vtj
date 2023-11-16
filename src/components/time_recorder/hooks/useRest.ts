import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Rest, Service } from "../../../client";
import { LoginStaff } from "../../staff_list/StaffList";
import fetchRest from "../fetchRest";

export default function useRest(loginStaff: LoginStaff) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [rest, setRest] = useState<Rest | null>(null);

  useEffect(() => {
    if (!loginStaff) return;

    setLoading(true);
    setError(null);

    fetchRest(loginStaff)
      .then((data) => {
        setRest(data);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loginStaff]);

  const restStart = async () => {
    if (!loginStaff) throw new Error("Login staff is not set");

    const targetRest = await (async () => {
      if (rest) return rest;

      return Service.createRest(
        {
          staff_id: loginStaff.id,
          work_date: dayjs().format("YYYY-MM-DD"),
        },
        loginStaff.id
      ).catch((e) => {
        throw e;
      });
    })();

    const now = dayjs();
    return Service.updateRest(
      targetRest.id,
      {
        staff_id: loginStaff.id,
        work_date: targetRest.work_date,
        start_time: now.toISOString(),
        end_time: targetRest.end_time,
      },
      loginStaff.id
    )
      .then((response) => {
        setRest(response);
        return response;
      })
      .catch((e) => {
        throw e;
      });
  };

  const restEnd = async () => {
    if (!loginStaff) throw new Error("Login staff is not set");
    if (!rest) throw new Error("Rest is not set");

    const now = dayjs();
    return Service.updateRest(
      rest.id,
      {
        staff_id: loginStaff.id,
        work_date: rest.work_date,
        start_time: rest.start_time,
        end_time: now.toISOString(),
      },
      loginStaff.id
    )
      .then((response) => {
        setRest(response);
        return response;
      })
      .catch((e) => {
        throw e;
      });
  };

  return { loading, error, rest, restStart, restEnd };
}
