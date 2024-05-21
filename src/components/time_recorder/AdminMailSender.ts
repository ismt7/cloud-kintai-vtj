import dayjs from "dayjs";

import { Attendance } from "@/API";
import * as MESSAGE_CODE from "@/errors";
import { CognitoUser } from "@/hooks/useCognitoUser";

import { MailSender } from "./MailSender";

export class AdminMailSender extends MailSender {
  constructor(cognitoUser: CognitoUser, attendance: Attendance) {
    super(cognitoUser, attendance);
  }

  private getStaffName() {
    const { familyName, givenName } = this.cognitoUser;
    if (!familyName && !givenName) {
      return "(不明)";
    }

    if (familyName && givenName) {
      return `${familyName} ${givenName} さん`;
    }

    return `${familyName || givenName} さん`;
  }

  private getAdminMailAddress() {
    // TODO: 送信先の管理向けメールアドレスを環境変数に設定
    //   - docker-compose.yml に設定
    //   - amplifyコンソールの環境変数に設定
    const adminMailAddress = import.meta.env.VITE_ADMIN_MAIL_ADDRESS as string;
    if (!adminMailAddress) {
      throw new Error(MESSAGE_CODE.E00002);
    }
    return adminMailAddress;
  }

  private getStaffAttendanceUrl() {
    const { id } = this.cognitoUser;

    const APP_BASE_PATH = import.meta.env.VITE_BASE_PATH;
    if (!APP_BASE_PATH) {
      throw new Error(MESSAGE_CODE.E00002);
    }

    return `${APP_BASE_PATH}/admin/staff/${id}/attendance`;
  }

  clockIn(): void {
    const { startTime, goDirectlyFlag } = this.attendance;

    const subject = `[出勤]勤怠連絡(${this.getStaffName()}) - ${this.getWorkDate()}`;
    const body = [
      "管理者 各位",
      "",
      `${this.getStaffName()}が出勤しました。`,
      "",
      "-----",
      `勤務日：${this.getWorkDate()}`,
      `出勤時刻：${startTime ? dayjs(startTime).format("HH:mm") : ""}`,
      `出退勤区分：${goDirectlyFlag ? "直行" : "通常出勤"}`,
      "-----",
      "",
      this.getStaffAttendanceUrl(),
      "",
    ].join("\n");

    this.send([this.getAdminMailAddress()], subject, body);
  }

  clockOut(): void {
    const { endTime, returnDirectlyFlag } = this.attendance;
    const subject = `[退勤]勤怠連絡(${this.getStaffName()}) - ${this.getWorkDate()}`;
    const body = [
      this.getStaffName(),
      "管理者 各位",
      "",
      `${this.getStaffName()}が退勤しました。`,
      "",
      "-----",
      `勤務日：${this.getWorkDate()}`,
      `退勤時刻：${endTime ? dayjs(endTime).format("HH:mm") : ""}`,
      `出退勤区分：${returnDirectlyFlag ? "直帰" : "通常退勤"}`,
      "-----",
      "",
      this.getStaffAttendanceUrl(),
      "",
    ].join("\n");

    this.send([this.getAdminMailAddress()], subject, body);
  }
}
