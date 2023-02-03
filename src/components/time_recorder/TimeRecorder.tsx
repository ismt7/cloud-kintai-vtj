import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect } from "react";
import Button from "../button/Button";
import Clock from "../clock/Clock";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import {
  clockIn,
  clockOut,
  endRest,
  fetchRestTime,
  fetchTimeRecord,
  goDirect,
  returnDirect,
  selectTimeRecord,
  startRest,
  TimeRecordStatus,
} from "../../lib/timeRecordSlice";
import { getWorkStatusCode, getWorkStatusText } from "./common";

const TimeRecorder = () => {
  const dispatch = useAppDispatch();
  const { attendanceData, restData, status } = useAppSelector(selectTimeRecord);
  // const { error } = useAppSelector((state) => state.timeRecordReducer);

  useEffect(() => {
    void dispatch(fetchTimeRecord());
    void dispatch(fetchRestTime());
  }, []);

  status.code = getWorkStatusCode(attendanceData, restData);
  status.text = getWorkStatusText(status.code);

  return (
    <Box width="400px">
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" textAlign="center">
            {status.text}
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
                  dispatch(clockIn());
                }}
                size="large"
                variant={
                  status.code === TimeRecordStatus.BEFORE_WORK
                    ? "outlined"
                    : "contained"
                }
                disabled={status.code !== TimeRecordStatus.BEFORE_WORK}
              />
            </Box>
            <Box>
              <Button
                color="clock_out"
                label="勤務終了"
                onClick={() => dispatch(clockOut())}
                size="large"
                variant={
                  status.code === TimeRecordStatus.WORKING
                    ? "outlined"
                    : "contained"
                }
                disabled={status.code !== TimeRecordStatus.WORKING}
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
                    onClick={() => dispatch(goDirect())}
                    variant={
                      status.code === TimeRecordStatus.BEFORE_WORK
                        ? "text"
                        : "contained"
                    }
                    disabled={status.code !== TimeRecordStatus.BEFORE_WORK}
                  />
                </Box>
                <Box>
                  <Button
                    color="clock_out"
                    label="直帰"
                    onClick={() => dispatch(returnDirect())}
                    variant={
                      status.code === TimeRecordStatus.WORKING
                        ? "text"
                        : "contained"
                    }
                    disabled={status.code !== TimeRecordStatus.WORKING}
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
                    onClick={() => dispatch(startRest())}
                    variant={
                      status.code === TimeRecordStatus.WORKING
                        ? "text"
                        : "contained"
                    }
                    disabled={status.code !== TimeRecordStatus.WORKING}
                  />
                </Box>
                <Box>
                  <Button
                    color="rest"
                    label="休憩終了"
                    onClick={() => dispatch(endRest())}
                    variant={
                      status.code === TimeRecordStatus.RESTING
                        ? "text"
                        : "contained"
                    }
                    disabled={status.code !== TimeRecordStatus.RESTING}
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
                multiline
                minRows={2}
                fullWidth
                placeholder="備考欄：客先名やイベント名などを記載"
              />
            </Box>
            <Box>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={0}
              >
                <Box>
                  <IconButton aria-label="remarks-done" onClick={() => {}}>
                    <CheckIcon color="success" />
                  </IconButton>
                </Box>
                <Box>
                  <IconButton aria-label="remarks-clear" onClick={() => {}}>
                    <ClearIcon color="error" />
                  </IconButton>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default TimeRecorder;
