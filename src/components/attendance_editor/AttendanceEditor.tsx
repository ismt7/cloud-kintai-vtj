import { Box, Button, Stack } from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Attendance, Rest } from "../../client";
import useAttendance from "./hooks/useAttendance";
import useLoginStaff from "./hooks/useLoginStaff";
import useRests from "./hooks/useRests";
import useStaff from "./hooks/useStaff";
import GoDirectlyItem from "./items/GoDirectlyItem";
import ProductionTimeItem from "./items/ProductionTimeItem";
import RemarksItem from "./items/RemarksItem";
import RestTimeItem from "./items/RestTimeItem";
import ReturnDirectlyItem from "./items/ReturnDirectlyItem";
import SeparatorItem from "./items/SeparatorItem";
import StaffNameItem from "./items/StaffNameItem";
import WorkDateItem from "./items/WorkDateItem";
import WorkTimeItem from "./items/WorkTimeItem";

export default function AttendanceEditor({
  cognitoUserId,
}: {
  cognitoUserId: string | undefined;
}) {
  const { targetWorkDate, staffId: targetStaffId } = useParams();
  const { loginStaff } = useLoginStaff(cognitoUserId);
  const { staff } = useStaff(loginStaff, targetStaffId);
  const { attendance, updateAttendance } = useAttendance(staff, targetWorkDate);
  const { rests } = useRests(staff, targetWorkDate);
  const navigate = useNavigate();

  const [attendanceFormState, setAttendanceFormState] =
    useState<Attendance | null>(null);
  const [restFormStates, setRestFormStates] = useState<Rest[] | null>(null);
  const [totalWorkTime, setTotalWorkTime] = useState<number>(0);
  const [totalRestTime, setTotalRestTime] = useState<number>(0);
  const [totalProductionTime, setTotalProductionTime] = useState<number>(0);

  useEffect(() => {
    if (!attendance) return;
    setAttendanceFormState(attendance);
  }, [attendance]);

  useEffect(() => {
    if (!rests) return;
    setRestFormStates(rests);
  }, [rests]);

  useEffect(() => {
    const productionTime = totalWorkTime - totalRestTime;
    setTotalProductionTime(productionTime);
  }, [totalWorkTime, totalRestTime]);

  return (
    <Stack spacing={2}>
      <Box>
        <StaffNameItem staff={staff} />
      </Box>
      <Box>
        <WorkDateItem attendance={attendanceFormState} />
      </Box>
      <Box>
        <GoDirectlyItem
          attendance={attendanceFormState}
          callback={(value) => {
            if (!attendanceFormState) return;

            setAttendanceFormState({
              ...attendanceFormState,
              go_directly_flag: value,
            });
          }}
        />
      </Box>
      <Box>
        <ReturnDirectlyItem
          attendance={attendanceFormState}
          callback={(value) => {
            if (!attendanceFormState) return;

            setAttendanceFormState({
              ...attendanceFormState,
              return_directly_flag: value,
            });
          }}
        />
      </Box>
      <Box>
        <WorkTimeItem
          attendance={attendanceFormState}
          callback={({ startTime, endTime, totalTime }) => {
            if (!attendanceFormState) return;

            setAttendanceFormState({
              ...attendanceFormState,
              start_time: startTime.toISOString(),
              end_time: endTime.toISOString(),
            });

            setTotalWorkTime(totalTime);
          }}
        />
      </Box>
      <Box>
        <RestTimeItem
          rests={restFormStates}
          staffId={staff?.id}
          workDate={targetWorkDate}
          callback={(editRests, totalTime) => {
            setRestFormStates(editRests);
            setTotalRestTime(totalTime);
          }}
        />
      </Box>
      <Box>
        <SeparatorItem />
      </Box>
      <Box>
        <ProductionTimeItem time={totalProductionTime} />
      </Box>
      <Box>
        <RemarksItem
          attendance={attendanceFormState}
          callback={(value) => {
            if (!attendanceFormState) return;

            setAttendanceFormState({
              ...attendanceFormState,
              remarks: value,
            });
          }}
        />
      </Box>
      {/* <Box>
          <hr />
        </Box> */}
      {/* <Box>
          <ReasonRevisionItem />
        </Box> */}
      {/* <Box>
          <ReasonRemarksItem />
        </Box> */}
      <Box>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"center"}
          spacing={3}
        >
          <Box>
            <Button
              color="cancel"
              variant="text"
              sx={{ width: "150px" }}
              onClick={() => {
                navigate("/admin/attendances");
              }}
            >
              キャンセル
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ width: "150px" }}
              onClick={() => updateAttendance(attendanceFormState)}
            >
              保存
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
