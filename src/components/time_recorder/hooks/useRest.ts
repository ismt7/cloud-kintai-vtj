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
    if (!loginStaff) {
      return;
    }

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
    if (!loginStaff) {
      throw new Error("Login staff is not set");
    }

    let currentRest = rest;
    if (!rest) {
      currentRest = await Service.createRest(
        {
          staff_id: loginStaff.id,
          work_date: new Date().toISOString(),
        },
        loginStaff.id
      ).catch((e) => {
        throw e;
      });
    }

    if (!currentRest) {
      throw new Error("Rest is not created");
    }

    const now = dayjs();
    const updatedRest = await Service.updateRest(
      currentRest.id,
      {
        staff_id: loginStaff.id,
        work_date: currentRest.work_date,
        start_time: now.toISOString(),
        end_time: currentRest.end_time,
      },
      loginStaff.id
    ).catch((e) => {
      throw e;
    });

    setRest(updatedRest);
  };

  const restEnd = async () => {
    if (!loginStaff) {
      throw new Error("Login staff is not set");
    }

    if (!rest) {
      throw new Error("Rest is not set");
    }

    const now = dayjs();
    const updatedRest = await Service.updateRest(
      rest.id,
      {
        staff_id: loginStaff.id,
        work_date: rest.work_date,
        start_time: rest.start_time,
        end_time: now.toISOString(),
      },
      loginStaff.id
    ).catch((e) => {
      throw e;
    });

    setRest(updatedRest);
  };

  return { loading, error, rest, restStart, restEnd };
}
