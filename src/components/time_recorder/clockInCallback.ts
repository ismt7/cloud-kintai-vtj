import { Dispatch } from "@reduxjs/toolkit";

import { CognitoUser } from "@/hooks/useCognitoUser";

import { Staff } from "../../API";
import * as MESSAGE_CODE from "../../errors";
import { TimeRecordMailSender } from "../../lib/mail/TimeRecordMailSender";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import { getNowISOStringWithZeroSeconds } from "./util";

export function clockInCallback(
  cognitoUser: CognitoUser | null | undefined,
  today: string,
  clockIn: (
    userId: string,
    today: string,
    now: string
  ) => Promise<import("../../API").Attendance>,
  dispatch: Dispatch,
  staff: Staff | null | undefined,
  logger: { debug: (e: unknown) => void }
) {
  if (!cognitoUser || !staff) {
    return;
  }

  const now = getNowISOStringWithZeroSeconds();
  clockIn(cognitoUser.id, today, now)
    .then((res) => {
      dispatch(setSnackbarSuccess(MESSAGE_CODE.S01001));
      new TimeRecordMailSender(cognitoUser, res, staff).clockIn();
    })
    .catch((e) => {
      logger.debug(e);
      dispatch(setSnackbarError(MESSAGE_CODE.E01001));
    });
}
