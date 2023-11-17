import { DataGrid, GridRowParams } from "@mui/x-data-grid";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Service, Staff } from "../../client";
import { LoginStaff } from "../staff_list/StaffList";
import { getCurrentWorkStatusV2 } from "../time_recorder/WorkStatusCodes";
import GetColumns, { SummaryAttendance } from "./Column";

async function fetchStaffs(
  loginStaff: LoginStaff,
  callback: (value: Staff[]) => void
) {
  if (!loginStaff) return;
  const staffs = await Service.getStaffs(loginStaff.id).catch((error) => {
    console.log(error);
    return [] as Staff[];
  });

  callback(staffs);
}

async function fetchAttendances(
  loginStaff: LoginStaff,
  staffs: Staff[],
  callback: (value: SummaryAttendance[]) => void
) {
  const now = dayjs();
  const fromDate = now.subtract(30, "day").format("YYYYMMDD");
  const toDate = now.format("YYYYMMDD");

  // 勤怠情報を取得
  const attendances = await Promise.all(
    staffs.map(async (staff) =>
      Service.getAttendancesByStaffId(staff.id, fromDate, toDate).catch(
        (error) => {
          console.log(error);
          return [];
        }
      )
    )
  ).then((values) => values.flat());

  const attendancesByStaffId = attendances.reduce((acc, cur) => {
    const staffId = cur.staff_id;
    if (!acc[staffId]) {
      acc[staffId] = [];
    }
    acc[staffId].push(cur);
    return acc;
  }, {} as { [key: number]: typeof attendances });

  // 休憩情報を取得
  const rests = await Promise.all(
    staffs.map(async (staff) =>
      Service.getRestsByStaffId(staff.id, fromDate, toDate).catch((error) => {
        console.log(error);
        return [];
      })
    )
  ).then((values) => values.flat());

  const restsByStaffId = rests.reduce((acc, cur) => {
    const staffId = cur.staff_id;
    if (!acc[staffId]) {
      acc[staffId] = [];
    }
    acc[staffId].push(cur);
    return acc;
  }, {} as { [key: number]: typeof rests });

  const summaryAttendances = staffs.map((staff) => {
    const staffAttendances = attendancesByStaffId[staff.id];
    const staffRests = restsByStaffId[staff.id] || [];

    if (!staffAttendances) {
      const workStatus = getCurrentWorkStatusV2(null, null);
      return {
        id: staff.id,
        lastName: staff.last_name,
        firstName: staff.first_name,
        workStatus: workStatus.text,
        startTime: "--:--",
        endTime: "--:--",
        totalWorkHoursPerMonth: 0,
        totalWorkDaysPerMonth: 0,
      } as SummaryAttendance;
    }

    // 今日の出勤状況を取得
    const workDate = now.format("YYYY-MM-DD");
    const todayAttendance = staffAttendances.find(
      (attendance) => attendance.work_date === workDate
    );

    // 今日の休憩状況を取得
    // 複数件ある場合は、最新のものを取得
    const todayRest = staffRests.filter(
      (rest) => rest.work_date === workDate
    )[0];

    // 合計稼働時間を取得
    const totalWorkHoursPerMonth = staffAttendances.reduce((acc, cur) => {
      if (!cur.start_time || !cur.end_time) return acc;

      const startTime = dayjs(cur.start_time);
      const endTime = dayjs(cur.end_time);
      const workHours = endTime.diff(startTime, "hour");
      return acc + workHours;
    }, 0);

    const startTime = todayAttendance?.start_time
      ? dayjs(todayAttendance?.start_time).format("HH:mm")
      : "--:--";
    const endTime = todayAttendance?.end_time
      ? dayjs(todayAttendance?.end_time).format("HH:mm")
      : "--:--";

    const workStatus = getCurrentWorkStatusV2(
      todayAttendance || null,
      todayRest || null
    );

    return {
      id: staff.id,
      lastName: staff.last_name,
      firstName: staff.first_name,
      workStatus: workStatus.text,
      startTime,
      endTime,
      totalWorkHoursPerMonth,
      totalWorkDaysPerMonth: staffAttendances.length,
    } as SummaryAttendance;
  });

  callback(summaryAttendances);
}

export default function AttendanceDailyList({
  loginStaff,
}: {
  loginStaff: LoginStaff;
}) {
  const navigate = useNavigate();
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [summaryAttendances, setSummaryAttendances] = useState<
    SummaryAttendance[]
  >([]);

  useEffect(() => {
    if (!loginStaff) return;

    void fetchStaffs(loginStaff, (value) => setStaffs(value));
  }, [loginStaff]);

  useEffect(() => {
    if (!loginStaff || !staffs) return;

    void fetchAttendances(loginStaff, staffs, setSummaryAttendances);
  }, [loginStaff, staffs]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={summaryAttendances}
        columns={GetColumns()}
        slots={{
          loadingOverlay: () => <div>読み込み中...</div>,
          noRowsOverlay: () => <div>データがありません</div>,
          footer: () => null,
        }}
        onRowClick={(params: GridRowParams<SummaryAttendance>) => {
          const staffId = params.row.id;
          navigate(`/admin/staff/${staffId}/attendance`);
        }}
      />
    </div>
  );
}
