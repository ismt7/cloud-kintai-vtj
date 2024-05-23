import dayjs from "dayjs";

import { Attendance } from "@/API";
import { CognitoUser } from "@/hooks/useCognitoUser";

import { MailSender } from "./MailSender";

export class StaffMailSender extends MailSender {
  constructor(cognitoUser: CognitoUser, attendance: Attendance) {
    super(cognitoUser, attendance);
  }

  private getStaffName() {
    const { familyName, givenName } = this.cognitoUser;
    if (!familyName && !givenName) {
      return null;
    }

    if (familyName && givenName) {
      return `${familyName} ${givenName} さん`;
    }

    return `${familyName || givenName} さん`;
  }

  clockIn() {
    const { mailAddress } = this.cognitoUser;
    const { startTime, goDirectlyFlag } = this.attendance;

    const subject = `[出勤]勤怠連絡 - ${this.getWorkDate()}`;
    const body = [
      `おはようございます。${this.getStaffName()}`,
      "",
      "出勤処理が完了しました。",
      "",
      "-----",
      `勤務日：${this.getWorkDate()}`,
      `出勤時刻：${startTime ? dayjs(startTime).format("HH:mm") : ""}`,
      `出退勤区分：${goDirectlyFlag ? "直行" : "通常出勤"}`,
      "-----",
      "",
      "本日も1日よろしくお願いします。",
    ].join("\n");

    this.send([mailAddress], subject, body);
  }

  clockOut() {
    const { mailAddress } = this.cognitoUser;
    const { endTime, returnDirectlyFlag } = this.attendance;
    const subject = `[退勤]勤怠連絡 - ${this.getWorkDate()}`;
    const body = [
      `お疲れ様でした。${this.getStaffName()}`,
      "",
      "退勤処理が完了しました。",
      "",
      "-----",
      `勤務日：${this.getWorkDate()}`,
      `退勤時刻：${endTime ? dayjs(endTime).format("HH:mm") : ""}`,
      `出退勤区分：${returnDirectlyFlag ? "直帰" : "通常退勤"}`,
      "-----",
      "",
      "1日お疲れ様でした。気をつけて帰ってくださいね。",
    ].join("\n");

    this.send([mailAddress], subject, body);
  }
}
