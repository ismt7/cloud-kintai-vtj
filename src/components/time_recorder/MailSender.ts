import { API } from "aws-amplify";
import dayjs from "dayjs";

import { Attendance } from "@/API";
import * as MESSAGE_CODE from "@/errors";
import { sendMail } from "@/graphql/queries";
import { CognitoUser } from "@/hooks/useCognitoUser";

export abstract class MailSender {
  cognitoUser: CognitoUser;
  attendance: Attendance;

  constructor(cognitoUser: CognitoUser, attendance: Attendance) {
    this.cognitoUser = cognitoUser;
    this.attendance = attendance;
  }

  protected send(to: string[], subject: string, body: string) {
    const params = {
      query: sendMail,
      variables: {
        data: {
          to,
          subject,
          body,
        },
      },
    };

    try {
      void API.graphql(params);
    } catch {
      throw new Error(MESSAGE_CODE.E00001);
    }
  }

  protected getWorkDate() {
    const { workDate } = this.attendance;
    return dayjs(workDate).format("YYYY/MM/DD");
  }

  abstract clockIn(): void;
  abstract clockOut(): void;
}
