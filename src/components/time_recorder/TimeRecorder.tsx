import { useEffect, useState } from "react";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import useLoginStaff from "../attendance_editor/hooks/useLoginStaff";
import Clock from "../clock/Clock";
import useAttendance from "./hooks/useAttendance";
import useRest from "./hooks/useRest";
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
  const {
    attendance,
    clockIn,
    clockOut,
    goDirectly,
    returnDirectly,
    updateRemarks,
    loading: attendanceLoading,
  } = useAttendance(loginStaff);
  const {
    rest,
    restStart,
    restEnd,
    loading: restLoading,
  } = useRest(loginStaff);
  const [workStatus, setWorkStatus] = useState<WorkStatus | null>(null);

  useEffect(() => {
    setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
  }, [attendance, rest]);

  if (loginStaffLoading || attendanceLoading || restLoading || !loginStaff) {
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
            workStatus={workStatus}
            onClick={() => {
              void clockIn().then(() => {
                setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
              });
            }}
          />
          <ClockOutItem
            workStatus={workStatus}
            onClick={() => {
              void clockOut().then(() => {
                setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
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
                void goDirectly().then(() => {
                  setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
                });
              }}
            />
            <ReturnDirectly
              workStatus={workStatus}
              onClick={() => {
                void returnDirectly().then(() => {
                  setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
                });
              }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <RestStartItem
              workStatus={workStatus}
              onClick={() => {
                void restStart().then(() => {
                  setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
                });
              }}
            />
            <RestEndItem
              workStatus={workStatus}
              onClick={() => {
                void restEnd().then(() => {
                  setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
                });
              }}
            />
          </Stack>
        </Stack>
        <TimeRecorderRemarks
          attendance={attendance}
          onSave={(remarks) => {
            void updateRemarks(remarks || "").then(() => {
              setWorkStatus(getCurrentWorkStatusV2(attendance, rest));
            });
          }}
        />
      </Stack>
    </Box>
  );
};

export default TimeRecorder;
