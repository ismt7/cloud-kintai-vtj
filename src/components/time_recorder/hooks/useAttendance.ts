import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Attendance, Service } from "../../../client";
import { LoginStaff } from "../../staff_list/StaffList";
import createAttendanceData from "../createAttendance";
import fetchAttendance from "../fetchAttendance";

export default function useAttendance(loginStaff: LoginStaff) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [attendance, setAttendance] = useState<Attendance | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (!loginStaff) {
      setLoading(false);
      return;
    }

    fetchAttendance(loginStaff)
      .then((data) => {
        setAttendance(data);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loginStaff]);

  const clockIn = async () => {
    if (!loginStaff) {
      throw new Error("Login staff is not set");
    }

    let currentAttendance = attendance;
    if (!attendance) {
      currentAttendance = await createAttendanceData(loginStaff).catch((e) => {
        throw e;
      });
    }

    if (!currentAttendance) {
      throw new Error("Attendance is not created");
    }

    const now = dayjs();
    const updatedAttendance = await Service.updateAttendance(
      currentAttendance.id,
      {
        staff_id: loginStaff.id,
        work_date: currentAttendance.work_date,
        start_time: now.toISOString(),
        end_time: currentAttendance.end_time,
        go_directly_flag: currentAttendance.go_directly_flag,
        return_directly_flag: currentAttendance.return_directly_flag,
        remarks: currentAttendance.remarks,
      },
      loginStaff.id
    ).catch((e) => {
      throw e;
    });

    setAttendance(updatedAttendance);
  };

  const clockOut = async () => {
    if (!loginStaff) {
      throw new Error("Login staff is not set");
    }

    if (!attendance) {
      throw new Error("Attendance is not created");
    }

    const now = dayjs();
    const updatedAttendance = await Service.updateAttendance(
      attendance.id,
      {
        staff_id: loginStaff.id,
        work_date: attendance.work_date,
        start_time: attendance.start_time,
        end_time: now.toISOString(),
        go_directly_flag: attendance.go_directly_flag,
        return_directly_flag: attendance.return_directly_flag,
        remarks: attendance.remarks,
      },
      loginStaff.id
    ).catch((e) => {
      throw e;
    });

    setAttendance(updatedAttendance);
  };

  const goDirectly = async () => {
    if (!loginStaff) {
      throw new Error("Login staff is not set");
    }

    let currentAttendance = attendance;
    if (!attendance) {
      currentAttendance = await createAttendanceData(loginStaff).catch((e) => {
        throw e;
      });
    }

    if (!currentAttendance) {
      throw new Error("Attendance is not created");
    }

    const now = dayjs().hour(9).minute(0).second(0);
    const updatedAttendance = await Service.updateAttendance(
      currentAttendance.id,
      {
        staff_id: loginStaff.id,
        work_date: currentAttendance.work_date,
        start_time: now.toISOString(),
        end_time: currentAttendance.end_time,
        go_directly_flag: true,
        return_directly_flag: currentAttendance.return_directly_flag,
        remarks: currentAttendance.remarks,
      },
      loginStaff.id
    ).catch((e) => {
      throw e;
    });

    setAttendance(updatedAttendance);
  };

  const returnDirectly = async () => {
    if (!loginStaff) {
      throw new Error("Login staff is not set");
    }

    if (!attendance) {
      throw new Error("Attendance is not created");
    }

    const now = dayjs().hour(18).minute(0).second(0);
    const updatedAttendance = await Service.updateAttendance(
      attendance.id,
      {
        staff_id: loginStaff.id,
        work_date: attendance.work_date,
        start_time: attendance.start_time,
        end_time: now.toISOString(),
        go_directly_flag: attendance.go_directly_flag,
        return_directly_flag: true,
        remarks: attendance.remarks,
      },
      loginStaff.id
    ).catch((e) => {
      throw e;
    });

    setAttendance(updatedAttendance);
  };

  const updateRemarks = async (remarks: string) => {
    if (!loginStaff) {
      throw new Error("Login staff is not set");
    }

    let currentAttendance = attendance;
    if (!attendance) {
      currentAttendance = await createAttendanceData(loginStaff).catch((e) => {
        throw e;
      });
    }

    if (!currentAttendance) {
      throw new Error("Attendance is not created");
    }

    const updatedAttendance = await Service.updateAttendance(
      currentAttendance.id,
      {
        staff_id: loginStaff.id,
        work_date: currentAttendance.work_date,
        start_time: currentAttendance.start_time,
        end_time: currentAttendance.end_time,
        go_directly_flag: currentAttendance.go_directly_flag,
        return_directly_flag: currentAttendance.return_directly_flag,
        remarks,
      },
      loginStaff.id
    ).catch((e) => {
      throw e;
    });

    setAttendance(updatedAttendance);
  };

  return {
    loading,
    error,
    attendance,
    clockIn,
    clockOut,
    goDirectly,
    returnDirectly,
    updateRemarks,
  };
}
