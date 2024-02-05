import { API } from "aws-amplify";
import dayjs from "dayjs";

import { Attendance } from "../../API";
import { sendMail } from "../../graphql/queries";
import { CognitoUser } from "../../hooks/useCognitoUser";

export default function sendClockOutMail(
  cognitoUser: CognitoUser,
  attendance: Attendance
) {
  const { mailAddress, familyName, givenName } = cognitoUser;
  const { workDate, endTime, returnDirectlyFlag } = attendance;
  void API.graphql({
    query: sendMail,
    variables: {
      data: {
        to: [mailAddress],
        subject: `[退勤]勤怠連絡 - ${dayjs(workDate).format("YYYY/MM/DD")}`,
        body: [
          (() => {
            if (!cognitoUser.familyName && !givenName) {
              return "こんにちは。";
            }

            if (familyName && givenName) {
              return `こんにちは、${familyName} ${givenName} さん`;
            }

            return `こんにちは、${familyName || givenName} さん`;
          })(),
          "",
          "退勤処理が完了しました。",
          "",
          "-----",
          `勤務日：${dayjs(workDate).format("YYYY/MM/DD")}`,
          `退勤時刻：${endTime ? dayjs(endTime).format("HH:mm") : ""}`,
          `出退勤区分：${returnDirectlyFlag ? "直帰" : "通常退勤"}`,
          "-----",
          "",
          "1日お疲れ様でした。気をつけて帰ってくださいね。",
        ].join("\n"),
      },
    },
  });
}
