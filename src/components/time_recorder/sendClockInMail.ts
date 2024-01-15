import { API } from "aws-amplify";
import dayjs from "dayjs";
import { sendMail } from "../../graphql/queries";
import { CognitoUser } from "../../hooks/useCognitoUser";
import { Attendance } from "../../API";

export default function sendClockInMail(
  cognitoUser: CognitoUser,
  attendance: Attendance
) {
  const { mailAddress, familyName, givenName } = cognitoUser;
  const { workDate, startTime, goDirectlyFlag } = attendance;
  void API.graphql({
    query: sendMail,
    variables: {
      data: {
        to: [mailAddress],
        subject: `[出勤]勤怠連絡 - ${dayjs(workDate).format("YYYY/MM/DD")}`,
        body: [
          (() => {
            if (!familyName && !givenName) {
              return "おはようございます。";
            }

            if (familyName && givenName) {
              return `おはようございます、${familyName} ${givenName} さん`;
            }

            return `おはようございます、${familyName || givenName} さん`;
          })(),
          "",
          "出勤処理が完了しました。",
          "",
          "-----",
          `勤務日：${dayjs(workDate).format("YYYY/MM/DD")}`,
          `出勤時刻：${startTime ? dayjs(startTime).format("HH:mm") : ""}`,
          `出退勤区分：${goDirectlyFlag ? "直行" : "通常出勤"}}`,
          "-----",
          "",
          "本日も1日よろしくお願いします。",
        ].join("\n"),
      },
    },
  });
}
