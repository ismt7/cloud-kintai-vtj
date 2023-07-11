import { useEffect } from "react";

import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

import { useAppDispatchV2, useAppSelectorV2 } from "../../app/hooks";
import {
  LoginStaffStatus,
  selectLoginStaff,
} from "../../lib/reducers/loginStaffReducer";
import Clock from "../clock/Clock";

import ClockInItem from "./items/ClockInItem";
import ClockOutItem from "./items/ClockOutItem";
import GoDirectlyItem from "./items/GoDirectlyItem";
import RestEndItem from "./items/RestEndItem";
import RestStartItem from "./items/RestStartItem";
import ReturnDirectly from "./items/ReturnDirectlyItem";
import TimeRecorderRemarks from "./TimeRecorderRemarks";
import { fetchCurrentData, selectTimeRecorder } from "./TimeRecorderSlice";

const TimeRecorder = () => {
  const { workStatus } = useAppSelectorV2(selectTimeRecorder);
  const { data: staff, status: staffStateStatus } =
    useAppSelectorV2(selectLoginStaff);

  const dispatch = useAppDispatchV2();
  useEffect(() => {
    if (staffStateStatus === LoginStaffStatus.ERROR || !staff) {
      return;
    }

    const now = dayjs();
    const workDate = Number(now.format("YYYYMMDD"));

    void dispatch(fetchCurrentData({ staffId: staff.staffId, workDate }));
  }, []);

  return (
    <Box width="400px">
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" textAlign="center">
            {workStatus.text}
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
              <ClockInItem staffId={staff?.staffId} workStatus={workStatus} />
            </Box>
            <Box>
              <ClockOutItem staffId={staff?.staffId} workStatus={workStatus} />
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
                  <GoDirectlyItem
                    staffId={staff?.staffId}
                    workStatus={workStatus}
                  />
                </Box>
                <Box>
                  <ReturnDirectly
                    staffId={staff?.staffId}
                    workStatus={workStatus}
                  />
                </Box>
              </Stack>
            </Box>
            <Box>
              <Stack direction="row" spacing={1}>
                <Box>
                  <RestStartItem
                    staffId={staff?.staffId}
                    workStatus={workStatus}
                  />
                </Box>
                <Box>
                  <RestEndItem
                    staffId={staff?.staffId}
                    workStatus={workStatus}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box>
          <TimeRecorderRemarks staffId={staff?.staffId} />
        </Box>
      </Stack>
    </Box>
  );
};

export default TimeRecorder;
