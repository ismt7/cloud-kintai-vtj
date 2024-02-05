import { API } from "aws-amplify";
import dayjs from "dayjs";

import { Attendance, AttendanceHistory } from "../../API";
import { sendMail } from "../../graphql/queries";
import { StaffType } from "../../hooks/useStaffs/useStaffs";
import getAttendanceMailBody from "./attendanceMailTemplate";

export default function sendChangedAttendanceMail(
  toMailAddresses: string[],
  workDate: dayjs.Dayjs,
  staff: StaffType,
  attendance: Attendance,
  latestHistory: AttendanceHistory
) {
  return API.graphql({
    query: sendMail,
    variables: {
      data: {
        to: toMailAddresses,
        subject: `勤怠情報変更のお知らせ - ${workDate.format("YYYY/MM/DD")}`,
        body: getAttendanceMailBody(staff, attendance, latestHistory).join(
          "\n"
        ),
      },
    },
  });
}
