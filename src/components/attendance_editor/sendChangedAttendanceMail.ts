import { API } from "aws-amplify";
import dayjs from "dayjs";
import { sendMail } from "../../graphql/queries";
import { Staff } from "../../hooks/useStaffs/common";
import { Attendance, AttendanceHistory } from "../../API";
import getAttendanceMailBody from "./attendanceMailTemplate";

export default function sendChangedAttendanceMail(
  toMailAddresses: string[],
  workDate: dayjs.Dayjs,
  staff: Staff,
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
