import { Dispatch } from "@reduxjs/toolkit";
import { Logger } from "aws-amplify";

import { CognitoUser } from "@/hooks/useCognitoUser";

import { Attendance } from "../../API";
import * as MESSAGE_CODE from "../../errors";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import { getNowISOStringWithZeroSeconds } from "./util";

export function restEndCallback(
  cognitoUser: CognitoUser | null | undefined,
  today: string,
  restEnd: (
    staffId: string,
    workDate: string,
    endTime: string
  ) => Promise<Attendance>,
  dispatch: Dispatch,
  logger: Logger
) {
  if (!cognitoUser) {
    return;
  }

  const now = getNowISOStringWithZeroSeconds();
  restEnd(cognitoUser.id, today, now)
    .then(() => dispatch(setSnackbarSuccess(MESSAGE_CODE.S01006)))
    .catch((e) => {
      logger.debug(e);
      dispatch(setSnackbarError(MESSAGE_CODE.E01004));
    });
}
