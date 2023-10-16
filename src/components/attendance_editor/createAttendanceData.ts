import { Attendance, Service } from "../../client";

async function createAttendanceData(staffId: number, body: Attendance) {
  return Service.createAttendance(
    {
      staff_id: body.staff_id,
      work_date: body.work_date,
      start_time: body.start_time,
      end_time: body.end_time,
      go_directly_flag: body.go_directly_flag,
      return_directly_flag: body.return_directly_flag,
      remarks: body.remarks,
    },
    staffId
  );
}

export default createAttendanceData;
