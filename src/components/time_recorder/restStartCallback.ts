import { Dispatch } from "@reduxjs/toolkit";
import { Logger } from "aws-amplify";

import { Attendance } from "@/API";
import * as MESSAGE_CODE from "@/errors";
import { CognitoUser } from "@/hooks/useCognitoUser";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "@/lib/reducers/snackbarReducer";

import { getNowISOStringWithZeroSeconds } from "./util";

export function restStartCallback(
  cognitoUser: CognitoUser | null | undefined,
  today: string,
  dispatch: Dispatch,
  restStart: (
    staffId: string,
    workDate: string,
    startTime: string
  ) => Promise<Attendance>,
  logger: Logger
) {
  if (!cognitoUser) {
    return;
  }

  const now = getNowISOStringWithZeroSeconds();

  restStart(cognitoUser.id, today, now)
    .then(() => {
      dispatch(setSnackbarSuccess(MESSAGE_CODE.S01005));
    })
    .catch((e) => {
      logger.debug(e);
      dispatch(setSnackbarError(MESSAGE_CODE.E01003));
    });
}
