import { API } from "aws-amplify";
import dayjs from "dayjs";

import { Attendance, AttendanceHistory } from "../../API";
import * as MESSAGE_CODE from "../../errors";
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
  const mailParams = {
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
  };

  try {
    void API.graphql(mailParams);
  } catch {
    throw new Error(MESSAGE_CODE.E00001);
  }
}
