import { API } from "aws-amplify";
import dayjs from "dayjs";
import { sendMail } from "../../../graphql/queries";
import { Attendance } from "../../../API";
import { StaffType } from "../../../hooks/useStaffs/useStaffs";

export default function sendApprovedChangeRequest(
  staff: StaffType | null | undefined,
  attendance: Attendance | null,
  comment: string | undefined
) {
  if (!staff || !attendance) {
    return;
  }

  const { mailAddress, familyName, givenName } = staff;
  const { workDate } = attendance;
  void API.graphql({
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
          `https://dev.kintai.virtualtech.jp/attendance/${dayjs(
            workDate
          ).format("YYYYMMDD")}/edit`,
          "",
          "【コメント】",
          comment || "コメントはありません。",
          "",
          "疑問点などがあれば、スタッフ管理者にお問い合わせください。",
        ].join("\n"),
      },
    },
  });
}
