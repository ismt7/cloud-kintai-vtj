import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Button from "../button/Button";
import Clock from "../clock/Clock";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import registerClockIn from "../../lib/time_record/RegisterClockIn";
import registerClockOut from "../../lib/time_record/RegisterClockOut";
import registerRestStart from "../../lib/time_record/RegisterRestStart";
import registerRestEnd from "../../lib/time_record/RegisterRestEnd";
import updateRemarks from "../../lib/time_record/UpdateRemarks";
import {
  selectAttendance,
  selectRest,
  selectStaff,
  selectTimeRecord,
} from "../../lib/store";
import fetchAttendance from "../../lib/time_record/FetchAttendance";
import { StaffStatus } from "../../lib/reducers/staffSlice";
import fetchRest from "../../lib/time_record/FetchRest";
import { TimeRecordStatus } from "../../lib/reducers/timeRecordSlice";
import getTimeRecordStatus from "../../lib/time_record/getTimeRecordStatus";

const TimeRecorder = () => {
  const dispatch = useAppDispatch();
  const staff = useAppSelector(selectStaff);
  const attendance = useAppSelector(selectAttendance);
  const rest = useAppSelector(selectRest);
  const timeRecord = useAppSelector(selectTimeRecord);
  const [remarksTextFieldDisabled, setRemarksTextFieldDisabled] =
    useState<boolean>(false);
  const [remarksSubmitButtonVisible, setRemarksSubmitButtonVisible] =
    useState<boolean>(false);
  const [remarksText, setRemarksText] = useState<string>(
    attendance.data?.remarks || ""
  );
  const [remarksSubmitButtonDisabled, setRemarksSubmitButtonDisabled] =
    useState<boolean>(false);
  const [remarksClearButtonDisabled, setRemarksClearButtonDisabled] =
    useState<boolean>(true);

  useEffect(() => {
    if (staff.status === StaffStatus.ERROR || !staff.data) return;

    const workDate = Number(dayjs().format("YYYYMMDD"));
    void dispatch(fetchAttendance({ staffId: staff.data.staffId, workDate }));
    void dispatch(fetchRest({ staffId: staff.data.staffId, workDate }));
  }, []);

  useEffect(() => {
    setRemarksText(attendance.data?.remarks || "");
    setRemarksTextFieldDisabled(false);
    setRemarksSubmitButtonDisabled(false);
    setRemarksSubmitButtonVisible(false);
    setRemarksClearButtonDisabled(false);
  }, [attendance.data?.remarks]);

  useEffect(() => {
    void dispatch(
      getTimeRecordStatus({
        staff,
        attendance,
        rest,
      })
    );
  }, [staff, attendance, rest]);

  const clockInHandler = (isDirect: boolean) => {
    void dispatch(
      registerClockIn({
        staffId: staff.data?.staffId,
        workDate: Number(dayjs().format("YYYYMMDD")),
        startTime: dayjs().format("HH:mm:ss"),
        goDirectlyFlag: isDirect,
      })
    );
  };

  const clockOutHandler = (isDirect: boolean) => {
    void dispatch(
      registerClockOut({
        staffId: staff.data?.staffId,
        workDate: Number(dayjs().format("YYYYMMDD")),
        endTime: dayjs().format("HH:mm:ss"),
        returnDirectlyFlag: isDirect,
      })
    );
  };

  const restStartHandler = () => {
    void dispatch(
      registerRestStart({
        staffId: staff.data?.staffId,
        workDate: Number(dayjs().format("YYYYMMDD")),
        startTime: dayjs().format("HH:mm:ss"),
      })
    );
  };

  const restEndHandler = () => {
    void dispatch(
      registerRestEnd({
        staffId: staff.data?.staffId,
        workDate: Number(dayjs().format("YYYYMMDD")),
        endTime: dayjs().format("HH:mm:ss"),
      })
    );
  };

  const remarksChangeHandler = (text: string) => {
    void dispatch(
      updateRemarks({
        staffId: staff.data?.staffId,
        workDate: Number(dayjs().format("YYYYMMDD")),
        remarks: text,
      })
    );
  };

  return (
    <Box width="400px">
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" textAlign="center">
            {timeRecord.statusText}
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
                onClick={() => clockInHandler(false)}
                size="large"
                variant={
                  timeRecord.status === TimeRecordStatus.BEFORE_WORK
                    ? "outlined"
                    : "contained"
                }
                disabled={timeRecord.status !== TimeRecordStatus.BEFORE_WORK}
              />
            </Box>
            <Box>
              <Button
                color="clock_out"
                label="勤務終了"
                onClick={() => clockOutHandler(false)}
                size="large"
                variant={
                  timeRecord.status === TimeRecordStatus.WORKING
                    ? "outlined"
                    : "contained"
                }
                disabled={timeRecord.status !== TimeRecordStatus.WORKING}
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
                    onClick={() => clockInHandler(true)}
                    variant="text"
                    disabled={
                      timeRecord.status !== TimeRecordStatus.BEFORE_WORK
                    }
                  />
                </Box>
                <Box>
                  <Button
                    color="clock_out"
                    label="直帰"
                    onClick={() => clockOutHandler(true)}
                    variant="text"
                    disabled={timeRecord.status !== TimeRecordStatus.WORKING}
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
                    onClick={() => restStartHandler()}
                    variant="text"
                    disabled={timeRecord.status !== TimeRecordStatus.WORKING}
                  />
                </Box>
                <Box>
                  <Button
                    color="rest"
                    label="休憩終了"
                    onClick={() => restEndHandler()}
                    variant="text"
                    disabled={timeRecord.status !== TimeRecordStatus.RESTING}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Stack>
            <Box>
              <TextField
                data-testid="remarks-text"
                multiline
                minRows={2}
                fullWidth
                value={remarksText}
                disabled={remarksTextFieldDisabled}
                onChange={(event) => {
                  const currentRemarks = attendance.data?.remarks || "";
                  setRemarksSubmitButtonVisible(
                    event.target.value !== currentRemarks
                  );

                  setRemarksText(event.target.value);
                }}
                placeholder="備考欄：客先名やイベント名などを記載"
              />
            </Box>
            {remarksSubmitButtonVisible && (
              <Box>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={0}
                >
                  <Box>
                    <IconButton
                      data-testid="remarks-save"
                      aria-label="remarks-done"
                      disabled={remarksSubmitButtonDisabled}
                      onClick={() => {
                        setRemarksTextFieldDisabled(true);
                        setRemarksClearButtonDisabled(true);
                        setRemarksSubmitButtonDisabled(true);
                        remarksChangeHandler(remarksText);
                      }}
                    >
                      <CheckIcon color="success" />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton
                      data-testid="remarks-clear"
                      aria-label="remarks-clear"
                      disabled={remarksClearButtonDisabled}
                      onClick={() => {
                        setRemarksText(attendance.data?.remarks || "");
                        setRemarksSubmitButtonVisible(false);
                      }}
                    >
                      <ClearIcon color="error" />
                    </IconButton>
                  </Box>
                </Stack>
              </Box>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default TimeRecorder;
