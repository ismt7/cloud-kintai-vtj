import { useEffect, useState } from "react";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import { Attendance, Rest } from "../../client";
import useLoginStaff from "../attendance_editor/hooks/useLoginStaff";
import Clock from "../clock/Clock";
import fetchRest from "./fetchRest";
import ClockInItem from "./items/ClockInItem";
import ClockOutItem from "./items/ClockOutItem";
import GoDirectlyItem from "./items/GoDirectlyItem";
import RestEndItem from "./items/RestEndItem";
import RestStartItem from "./items/RestStartItem";
import ReturnDirectly from "./items/ReturnDirectlyItem";
import TimeRecorderRemarks from "./TimeRecorderRemarks";
import { getCurrentWorkStatusV2, WorkStatus } from "./WorkStatusCodes";

const TimeRecorder = ({
  cognitoUserId,
}: {
  cognitoUserId: string | undefined;
}) => {
  const { loginStaff, loading: loginStaffLoading } =
    useLoginStaff(cognitoUserId);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [rest, setRest] = useState<Rest | null>(null);
  const [workStatus, setWorkStatus] = useState<WorkStatus | null>(null);

  useEffect(() => {
    if (!loginStaff) return;
    // void fetchAttendance(loginStaff, (value) => setAttendance(value));
    void fetchRest(loginStaff, (value) => setRest(value));
  }, [loginStaff]);

  useEffect(() => {
    setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
  }, [attendance, rest]);

  if (loginStaffLoading || !loginStaff) {
    return <CircularProgress />;
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
            staffId={loginStaff.id}
            workStatus={workStatus}
            attendance={attendance}
            callback={(value) => {
              setAttendance(value);
              setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
            }}
          />
          <ClockOutItem
            staffId={loginStaff.id}
            workStatus={workStatus}
            rest={rest}
            callback={(value) => {
              setRest(value);
              setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
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
              staffId={loginStaff.id}
              workStatus={workStatus}
              attendance={attendance}
              callback={(value) => {
                setAttendance(value);
                setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
              }}
            />
            <ReturnDirectly
              staffId={loginStaff.id}
              workStatus={workStatus}
              attendance={attendance}
              callback={(value) => {
                setAttendance(value);
                setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
              }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <RestStartItem
              staffId={loginStaff.id}
              workStatus={workStatus}
              rest={rest}
              callback={(value) => {
                setRest(value);
                setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
              }}
            />
            <RestEndItem
              staffId={loginStaff.id}
              workStatus={workStatus}
              rest={rest}
              callback={(value) => {
                setRest(value);
                setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
              }}
            />
          </Stack>
        </Stack>
        <TimeRecorderRemarks
          staffId={loginStaff.id}
          attendance={attendance}
          callback={(value) => {
            setAttendance(value);
            setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
          }}
        />
      </Stack>
    </Box>
  );
};

export default TimeRecorder;
