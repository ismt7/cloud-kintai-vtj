import { useEffect } from "react";

import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

import { useAppDispatchV2, useAppSelectorV2 } from "../../app/hooks";
import { useAppSelector } from "../../lib/hooks";
import { LoginStaffStatus } from "../../lib/reducers/loginStaffReducer";
import { selectLoginStaff } from "../../lib/store";
import Button from "../button/Button";
import Clock from "../clock/Clock";

import TimeRecorderRemarks from "./TimeRecorderRemarks";
import {
  fetchCurrentData,
  handleClickClockInButton,
  handleClickClockOutButton,
  handleClickRestEndButton,
  handleClickRestStartButton,
  selectTimeRecorder,
} from "./TimeRecorderSlice";
import { WorkStatusCodes } from "./WorkStatusCodes";

const TimeRecorder = () => {
  const timeRecorderData = useAppSelectorV2(selectTimeRecorder);
  const dispatch = useAppDispatchV2();
  const staff = useAppSelector(selectLoginStaff);

  useEffect(() => {
    if (staff.status === LoginStaffStatus.ERROR || !staff.data) return;

    void dispatch(
      fetchCurrentData({
        staffId: staff.data?.staffId,
        workDate: Number(dayjs().format("YYYYMMDD")),
      })
    );
  }, []);

  return (
    <Box width="400px">
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" textAlign="center">
            {timeRecorderData.workStatus.text}
          </Typography>
        </Box>
        <Box>
          <Clock />
        </Box>
        <Box>
          <Stack
            direction="row"
            spacing={10}
            alignItems="flex-start"
            justifyContent="space-evenly"
          >
            <Box>
              <Button
                color="clock_in"
                label="勤務開始"
                onClick={() => {
                  void dispatch(
                    handleClickClockInButton({
                      staffId: staff.data?.staffId,
                      goDirectlyFlag: false,
                    })
                  );
                }}
                size="large"
                variant={
                  timeRecorderData.workStatus.code ===
                  WorkStatusCodes.BEFORE_WORK
                    ? "outlined"
                    : "contained"
                }
                disabled={
                  timeRecorderData.workStatus.code !==
                  WorkStatusCodes.BEFORE_WORK
                }
              />
            </Box>
            <Box>
              <Button
                color="clock_out"
                label="勤務終了"
                onClick={() => {
                  void dispatch(
                    handleClickClockOutButton({
                      staffId: staff.data?.staffId,
                      returnDirectlyFlag: false,
                    })
                  );
                }}
                size="large"
                variant={
                  timeRecorderData.workStatus.code === WorkStatusCodes.WORKING
                    ? "outlined"
                    : "contained"
                }
                disabled={
                  timeRecorderData.workStatus.code !== WorkStatusCodes.WORKING
                }
              />
            </Box>
          </Stack>
        </Box>
        <Box>
          <Stack
            direction="row"
            spacing={5}
            alignItems="flex-start"
            justifyContent="center"
          >
            <Box>
              <Stack direction="row" spacing={1}>
                <Box>
                  <Button
                    color="clock_in"
                    label="直行"
                    onClick={() => {
                      void dispatch(
                        handleClickClockInButton({
                          staffId: staff.data?.staffId,
                          goDirectlyFlag: true,
                        })
                      );
                    }}
                    variant="text"
                    disabled={
                      timeRecorderData.workStatus.code !==
                      WorkStatusCodes.BEFORE_WORK
                    }
                  />
                </Box>
                <Box>
                  <Button
                    color="clock_out"
                    label="直帰"
                    onClick={() => {
                      void dispatch(
                        handleClickClockOutButton({
                          staffId: staff.data?.staffId,
                          returnDirectlyFlag: true,
                        })
                      );
                    }}
                    variant="text"
                    disabled={
                      timeRecorderData.workStatus.code !==
                      WorkStatusCodes.WORKING
                    }
                  />
                </Box>
              </Stack>
            </Box>
            <Box>
              <Stack direction="row" spacing={1}>
                <Box>
                  <Button
                    color="rest"
                    label="休憩開始"
                    onClick={() => {
                      void dispatch(
                        handleClickRestStartButton({
                          staffId: staff.data?.staffId,
                        })
                      );
                    }}
                    variant="text"
                    disabled={
                      timeRecorderData.workStatus.code !==
                      WorkStatusCodes.WORKING
                    }
                  />
                </Box>
                <Box>
                  <Button
                    color="rest"
                    label="休憩終了"
                    onClick={() => {
                      void dispatch(
                        handleClickRestEndButton({
                          staffId: staff.data?.staffId,
                        })
                      );
                    }}
                    variant="text"
                    disabled={
                      timeRecorderData.workStatus.code !==
                      WorkStatusCodes.RESTING
                    }
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box>
          <TimeRecorderRemarks staffId={staff.data?.staffId} />
        </Box>
      </Stack>
    </Box>
  );
};

export default TimeRecorder;
