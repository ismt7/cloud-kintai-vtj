import { useEffect, useState } from "react";

import { Box, LinearProgress, Stack, Typography } from "@mui/material";

import { API, Cache, Logger } from "aws-amplify";
import dayjs from "dayjs";
import { useAppDispatchV2 } from "../../app/hooks";
import {
  E01001,
  E01002,
  E01003,
  E01004,
  E01005,
  E01006,
  E02003,
  S01001,
  S01002,
  S01003,
  S01004,
  S01005,
  S01006,
  S02003,
} from "../../errors";
import useAttendance, {
  GoDirectlyFlag,
  ReturnDirectlyFlag,
} from "../../hooks/useAttendance/useAttendance";
import { getWorkStatus } from "../../hooks/useAttendance/WorkStatus";
import useCognitoUser from "../../hooks/useCognitoUser";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import Clock from "../clock/Clock";
import ClockInItem from "./items/ClockInItem";
import ClockOutItem from "./items/ClockOutItem";
import GoDirectlyItem from "./items/GoDirectlyItem";
import RestEndItem from "./items/RestEndItem";
import RestStartItem from "./items/RestStartItem";
import ReturnDirectly from "./items/ReturnDirectlyItem";
import TimeRecorderRemarks from "./TimeRecorderRemarks";
import { WorkStatus } from "./common";
import { sendMail } from "../../graphql/queries";

export default function TimeRecorder() {
  const dispatch = useAppDispatchV2();
  const { cognitoUser, loading: cognitoUserLoading } = useCognitoUser();
  const {
    attendance,
    getAttendance,
    clockIn,
    clockOut,
    restStart,
    restEnd,
    updateRemarks,
  } = useAttendance();
  const [workStatus, setWorkStatus] = useState<WorkStatus | null>(null);

  const today = dayjs().format("YYYY-MM-DD");
  const logger = new Logger(
    "TimeRecorder",
    process.env.NODE_ENV === "development" ? "DEBUG" : "ERROR"
  );

  useEffect(() => {
    if (Cache.getItem("reloadTimer")) {
      return;
    }

    Cache.setItem("reloadTimer", true, { expires: 60 * 10 * 1000 });

    window.setTimeout(() => {
      alert("ページの有効期限が切れました。リロードしてください。");
      Cache.removeItem("reloadTimer");
    }, 60 * 10 * 1000);
  }, []);

  useEffect(() => {
    if (!cognitoUser) {
      return;
    }

    getAttendance(cognitoUser.id, today).catch((e) => {
      logger.debug(e);
      dispatch(setSnackbarError(E01001));
    });
  }, [cognitoUser]);

  useEffect(() => {
    setWorkStatus(getWorkStatus(attendance));
  }, [attendance]);

  if (cognitoUserLoading) {
    return <LinearProgress />;
  }

  return (
    <Box width="400px">
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" textAlign="center">
            {workStatus?.text || "読み込み中..."}
          </Typography>
        </Box>
        <Clock />
        <Stack
          direction="row"
          spacing={10}
          alignItems="flex-start"
          justifyContent="space-evenly"
        >
          <ClockInItem
            workStatus={workStatus}
            onClick={() => {
              if (!cognitoUser) return;

              const now = dayjs().toISOString();
              clockIn(cognitoUser.id, today, now)
                .then((res) => {
                  dispatch(setSnackbarSuccess(S01001));
                  void API.graphql({
                    query: sendMail,
                    variables: {
                      data: {
                        to: [cognitoUser.mailAddress],
                        subject: `[出勤]勤怠連絡 - ${dayjs(res.workDate).format(
                          "YYYY/MM/DD"
                        )}`,
                        body: [
                          (() => {
                            if (
                              !cognitoUser.familyName &&
                              !cognitoUser.givenName
                            ) {
                              return "おはようございます。";
                            }

                            if (
                              cognitoUser.familyName &&
                              cognitoUser.givenName
                            ) {
                              return `おはようございます、${cognitoUser.familyName} ${cognitoUser.givenName} さん`;
                            }

                            return `おはようございます、${
                              cognitoUser.familyName
                                ? cognitoUser.familyName
                                : cognitoUser.givenName
                            } さん`;
                          })(),
                          "",
                          "出勤処理が完了しました。",
                          "-----",
                          `勤務日：${dayjs(res.workDate).format("YYYY/MM/DD")}`,
                          `出勤時刻：${
                            res.startTime
                              ? dayjs(res.startTime).format("HH:mm")
                              : ""
                          }`,
                          `出退勤区分：${
                            res.goDirectlyFlag ? "直行" : "通常出勤"
                          }}`,
                          "-----",
                          "本日も1日よろしくお願いします。",
                        ].join("\n"),
                      },
                    },
                  });
                })
                .catch((e) => {
                  logger.debug(e);
                  dispatch(setSnackbarError(E01001));
                });
            }}
          />
          <ClockOutItem
            workStatus={workStatus}
            onClick={() => {
              if (!cognitoUser) return;

              const now = dayjs().toISOString();
              clockOut(cognitoUser.id, today, now)
                .then((res) => {
                  dispatch(setSnackbarSuccess(S01002));
                  void API.graphql({
                    query: sendMail,
                    variables: {
                      data: {
                        to: [cognitoUser.mailAddress],
                        subject: `[退勤]勤怠連絡 - ${dayjs(res.workDate).format(
                          "YYYY/MM/DD"
                        )}`,
                        body: [
                          (() => {
                            if (
                              !cognitoUser.familyName &&
                              !cognitoUser.givenName
                            ) {
                              return "こんにちは。";
                            }

                            if (
                              cognitoUser.familyName &&
                              cognitoUser.givenName
                            ) {
                              return `こんにちは、${cognitoUser.familyName} ${cognitoUser.givenName} さん`;
                            }

                            return `こんにちは、${
                              cognitoUser.familyName
                                ? cognitoUser.familyName
                                : cognitoUser.givenName
                            } さん`;
                          })(),
                          "",
                          "退勤処理が完了しました。",
                          "",
                          "-----",
                          `勤務日：${dayjs(res.workDate).format("YYYY/MM/DD")}`,
                          `退勤時刻：${
                            res.endTime
                              ? dayjs(res.endTime).format("HH:mm")
                              : ""
                          }`,
                          `出退勤区分：${
                            res.returnDirectlyFlag ? "直帰" : "通常退勤"
                          }}`,
                          "-----",
                          "",
                          "1日お疲れ様でした。気をつけて帰ってくださいね。",
                        ].join("\n"),
                      },
                    },
                  });
                })
                .catch((e) => {
                  logger.debug(e);
                  dispatch(setSnackbarError(E01002));
                });
            }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={5}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Stack direction="row" spacing={1}>
            <GoDirectlyItem
              workStatus={workStatus}
              onClick={() => {
                if (!cognitoUser) return;

                const now = dayjs().toISOString();
                clockIn(cognitoUser.id, today, now, GoDirectlyFlag.YES)
                  .then((res) => {
                    dispatch(setSnackbarSuccess(S01003));
                    void API.graphql({
                      query: sendMail,
                      variables: {
                        data: {
                          to: [cognitoUser.mailAddress],
                          subject: `[出勤]勤怠連絡 - ${dayjs(
                            res.workDate
                          ).format("YYYY/MM/DD")}`,
                          body: [
                            (() => {
                              if (
                                !cognitoUser.familyName &&
                                !cognitoUser.givenName
                              ) {
                                return "おはようございます。";
                              }

                              if (
                                cognitoUser.familyName &&
                                cognitoUser.givenName
                              ) {
                                return `おはようございます、${cognitoUser.familyName} ${cognitoUser.givenName} さん`;
                              }

                              return `おはようございます、${
                                cognitoUser.familyName
                                  ? cognitoUser.familyName
                                  : cognitoUser.givenName
                              } さん`;
                            })(),
                            "",
                            "出勤処理が完了しました。",
                            "",
                            "-----",
                            `勤務日：${dayjs(res.workDate).format(
                              "YYYY/MM/DD"
                            )}`,
                            `退勤時刻：${
                              res.endTime
                                ? dayjs(res.endTime).format("HH:mm")
                                : ""
                            }`,
                            `出退勤区分：${
                              res.goDirectlyFlag ? "直行" : "通常出勤"
                            }}`,
                            "-----",
                            "",
                            "本日も1日よろしくお願いします。",
                          ].join("\n"),
                        },
                      },
                    });
                  })
                  .catch((e) => {
                    logger.debug(e);
                    dispatch(setSnackbarError(E01005));
                  });
              }}
            />
            <ReturnDirectly
              workStatus={workStatus}
              onClick={() => {
                if (!cognitoUser) return;

                const now = dayjs().toISOString();
                clockOut(cognitoUser.id, today, now, ReturnDirectlyFlag.YES)
                  .then((res) => {
                    dispatch(setSnackbarSuccess(S01004));
                    void API.graphql({
                      query: sendMail,
                      variables: {
                        data: {
                          to: [cognitoUser.mailAddress],
                          subject: `[退勤]勤怠連絡 - ${dayjs(
                            res.workDate
                          ).format("YYYY/MM/DD")}`,
                          body: [
                            (() => {
                              if (
                                !cognitoUser.familyName &&
                                !cognitoUser.givenName
                              ) {
                                return "こんにちは。";
                              }

                              if (
                                cognitoUser.familyName &&
                                cognitoUser.givenName
                              ) {
                                return `こんにちは、${cognitoUser.familyName} ${cognitoUser.givenName} さん`;
                              }

                              return `こんにちは、${
                                cognitoUser.familyName
                                  ? cognitoUser.familyName
                                  : cognitoUser.givenName
                              } さん`;
                            })(),
                            "",
                            "退勤処理が完了しました。",
                            "",
                            "-----",
                            `勤務日：${dayjs(res.workDate).format(
                              "YYYY/MM/DD"
                            )}`,
                            `退勤時刻：${
                              res.endTime
                                ? dayjs(res.endTime).format("HH:mm")
                                : ""
                            }`,
                            `出退勤区分：${
                              res.returnDirectlyFlag ? "直帰" : "通常退勤"
                            }}`,
                            "-----",
                            "",
                            "本日も1日よろしくお願いします。",
                          ].join("\n"),
                        },
                      },
                    });
                  })
                  .catch((e) => {
                    logger.debug(e);
                    dispatch(setSnackbarError(E01006));
                  });
              }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <RestStartItem
              workStatus={workStatus}
              onClick={() => {
                if (!cognitoUser) return;

                const now = dayjs().toISOString();
                restStart(cognitoUser.id, today, now)
                  .then(() => dispatch(setSnackbarSuccess(S01005)))
                  .catch((e) => {
                    logger.debug(e);
                    dispatch(setSnackbarError(E01003));
                  });
              }}
            />
            <RestEndItem
              workStatus={workStatus}
              onClick={() => {
                if (!cognitoUser) return;

                const now = dayjs().toISOString();
                restEnd(cognitoUser.id, today, now)
                  .then(() => dispatch(setSnackbarSuccess(S01006)))
                  .catch((e) => {
                    logger.debug(e);
                    dispatch(setSnackbarError(E01004));
                  });
              }}
            />
          </Stack>
        </Stack>
        <TimeRecorderRemarks
          attendance={attendance}
          onSave={(remarks) => {
            if (!cognitoUser) return;

            updateRemarks(cognitoUser.id, today, remarks || "")
              .then(() => {
                dispatch(setSnackbarSuccess(S02003));
              })
              .catch((e) => {
                logger.debug(e);
                dispatch(setSnackbarError(E02003));
              });
          }}
        />
      </Stack>
    </Box>
  );
}
