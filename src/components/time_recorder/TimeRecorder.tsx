import { useEffect, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

import { Attendance, Rest, Staff } from "../../client";
import Clock from "../clock/Clock";
import fetchAttendance from "./fetchAttendance";
import fetchLoginStaff from "./fetchLoginStaff";
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
  const [staff, setStaff] = useState<Staff | null>(null);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [rest, setRest] = useState<Rest | null>(null);
  const [workStatus, setWorkStatus] = useState<WorkStatus | null>(null);

  useEffect(() => {
    if (!cognitoUserId) return;
    void fetchLoginStaff(cognitoUserId, (value) => setStaff(value));
  }, [cognitoUserId]);

  useEffect(() => {
    if (!staff) return;
    void fetchAttendance(staff, (value) => setAttendance(value));
    void fetchRest(staff, (value) => setRest(value));
  }, [staff]);

  useEffect(() => {
    setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
  }, [attendance, rest]);

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
            staffId={staff?.id}
            workStatus={workStatus}
            attendance={attendance}
            callback={(value) => {
              setAttendance(value);
              setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
            }}
          />
          <ClockOutItem
            staffId={staff?.id}
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
              staffId={staff?.id}
              workStatus={workStatus}
              attendance={attendance}
              callback={(value) => {
                setAttendance(value);
                setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
              }}
            />
            <ReturnDirectly
              staffId={staff?.id}
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
              staffId={staff?.id}
              workStatus={workStatus}
              rest={rest}
              callback={(value) => {
                setRest(value);
                setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
              }}
            />
            <RestEndItem
              staffId={staff?.id}
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
          staffId={staff?.id}
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
