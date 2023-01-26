import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import Button from "./Button";
import Clock from "./Clock";

interface TimeRecorderProps {
  clockInOnClick: () => void;
  clockOutOnClick: () => void;
  restStartOnClick: () => void;
  restEndOnClick: () => void;
  goDirectOnClick: () => void;
  returnDirectOnClick: () => void;
}

const TimeRecorder = ({
  clockInOnClick = () => {},
  clockOutOnClick = () => {},
  restStartOnClick = () => {},
  restEndOnClick = () => {},
  goDirectOnClick = () => {},
  returnDirectOnClick = () => {},
}: TimeRecorderProps) => {
  const [status, setStatus] = React.useState("Before work");

  const statusText = () => {
    switch (status) {
      case "Before work":
        return "出勤前";
      case "Working":
        return "勤務中";
      case "Resting":
        return "休憩中";
      case "Left work":
        return "退勤済み";
      default:
        return "";
    }
  };

  return (
    <Box width="400px">
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" textAlign="center">
            {statusText()}
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
                  clockInOnClick();
                  setStatus("Working");
                }}
                size="large"
                variant={status === "Before work" ? "outlined" : "contained"}
                disabled={status !== "Before work"}
              />
            </Box>
            <Box>
              <Button
                color="clock_out"
                label="勤務終了"
                onClick={() => {
                  clockOutOnClick();
                  setStatus("Left work");
                }}
                size="large"
                variant={status === "Working" ? "outlined" : "contained"}
                disabled={status !== "Working"}
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
                      goDirectOnClick();
                      setStatus("Working");
                    }}
                    variant={status === "Before work" ? "text" : "contained"}
                    disabled={status !== "Before work"}
                  />
                </Box>
                <Box>
                  <Button
                    color="clock_out"
                    label="直帰"
                    onClick={() => {
                      returnDirectOnClick();
                      setStatus("Left work");
                    }}
                    variant={status === "Working" ? "text" : "contained"}
                    disabled={status !== "Working"}
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
                      restStartOnClick();
                      setStatus("Resting");
                    }}
                    variant={status === "Working" ? "text" : "contained"}
                    disabled={status !== "Working"}
                  />
                </Box>
                <Box>
                  <Button
                    color="rest"
                    label="休憩終了"
                    onClick={() => {
                      restEndOnClick();
                      setStatus("Working");
                    }}
                    variant={status === "Resting" ? "text" : "contained"}
                    disabled={status !== "Resting"}
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
