import { API } from "aws-amplify";
import dayjs from "dayjs";

import { Attendance } from "../../../API";
import * as MESSAGE_CODE from "../../../errors";
import { sendMail } from "../../../graphql/queries";
import { StaffType } from "../../../hooks/useStaffs/useStaffs";

export default function sendApprovedChangeRequest(
  staff: StaffType | null | undefined,
  attendance: Attendance | null,
  comment: string | undefined
) {
  if (!staff || !attendance) {
    throw new Error(MESSAGE_CODE.E00002);
  }

  const APP_BASE_PATH = process.env.VITE_BASE_PATH;
  if (!APP_BASE_PATH) {
    throw new Error(MESSAGE_CODE.E00002);
  }

  const { mailAddress, familyName, givenName } = staff;
  const { workDate } = attendance;

  const mailParams = {
    query: sendMail,
    variables: {
      data: {
        to: [mailAddress],
        subject: `[承認]勤怠情報の変更リクエストが承認されました - ${dayjs(
          workDate
        ).format("YYYY/MM/DD")}`,
        body: [
          (() => {
            if (!familyName && !givenName) {
              return "お疲れ様です。";
            }

            if (familyName && givenName) {
              return `お疲れ様です、${familyName} ${givenName} さん`;
            }

            return `お疲れ様です、${familyName || givenName} さん`;
          })(),
          "",
          "勤怠情報の変更リクエストが承認されました。",
          "",
          `${APP_BASE_PATH}/attendance/${dayjs(workDate).format(
            "YYYYMMDD"
          )}/edit`,
          "",
          "【コメント】",
          comment || "コメントはありません。",
          "",
          "疑問点などがあれば、スタッフ管理者にお問い合わせください。",
        ].join("\n"),
      },
    },
  };

  try {
    void API.graphql(mailParams);
  } catch {
    throw new Error(MESSAGE_CODE.E00002);
  }
}
