import { Dispatch } from "@reduxjs/toolkit";
import { Logger } from "aws-amplify";

import { ReturnDirectlyFlag } from "@/hooks/useAttendance/useAttendance";
import { CognitoUser } from "@/hooks/useCognitoUser";

import { Attendance, Staff } from "../../API";
import * as MESSAGE_CODE from "../../errors";
import { TimeRecordMailSender } from "../../lib/mail/TimeRecordMailSender";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import { getNowISOStringWithZeroSeconds } from "./util";

export function clockOutCallback(
  cognitoUser: CognitoUser | null | undefined,
  today: string,
  clockOut: (
    staffId: string,
    workDate: string,
    endTime: string,
    returnDirectlyFlag?: ReturnDirectlyFlag
  ) => Promise<Attendance>,
  dispatch: Dispatch,
  staff: Staff | null | undefined,
  logger: Logger
) {
  if (!cognitoUser || !staff) {
    return;
  }
  const now = getNowISOStringWithZeroSeconds();
  clockOut(cognitoUser.id, today, now)
    .then((res) => {
      dispatch(setSnackbarSuccess(MESSAGE_CODE.S01002));
      new TimeRecordMailSender(cognitoUser, res, staff).clockOut();
    })
    .catch((e) => {
      logger.debug(e);
      dispatch(setSnackbarError(MESSAGE_CODE.E01002));
    });
}
