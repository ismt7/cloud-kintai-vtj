import { Box, Button, Stack } from "@mui/material";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Attendance, Rest, Staff } from "../../client";
import { LoginStaff } from "../staff_list/StaffList";
import fetchAttendance from "./fetchAttendance";
import fetchLoginStaff from "./fetchLoginStaff";
import fetchRests from "./fetchRests";
import fetchStaff from "./fetchStaff";
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
  const { targetWorkDate, targetStaffId } = useParams();
  const navigate = useNavigate();

  const [loginStaff, setLoginStaff] = useState<LoginStaff>(null);
  const [staff, setStaff] = useState<Staff | null>(null);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [rests, setRests] = useState<Rest[] | null>(null);
  const [totalWorkTime, setTotalWorkTime] = useState<number>(0);
  const [totalRestTime, setTotalRestTime] = useState<number>(0);
  const [totalProductionTime, setTotalProductionTime] = useState<number>(0);

  useEffect(() => {
    if (!cognitoUserId) return;

    void fetchLoginStaff(cognitoUserId)
      .then((value) => setLoginStaff(value))
      .catch((error) => {
        console.log(error);
      });
  }, [cognitoUserId]);

  useEffect(() => {
    if (!loginStaff || !targetStaffId) return;

    void fetchStaff(loginStaff, Number(targetStaffId))
      .then((value) => setStaff(value))
      .catch((error) => {
        console.log(error);
      });
  }, [loginStaff]);

  useEffect(() => {
    if (!staff || !targetWorkDate) return;

    const fromDate = dayjs(targetWorkDate);
    const toDate = fromDate;

    void fetchAttendance(staff.id, fromDate, toDate)
      .then((value) => setAttendance(value))
      .catch((error) => {
        console.log(error);
      });

    void fetchRests(staff.id, fromDate, toDate)
      .then((value) => {
        setRests(value);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [staff, targetWorkDate]);

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
        <WorkDateItem attendance={attendance} />
      </Box>
      <Box>
        <GoDirectlyItem
          attendance={attendance}
          callback={(value) => {
            if (!attendance) return;

            setAttendance({
              ...attendance,
              go_directly_flag: value,
            });
          }}
        />
      </Box>
      <Box>
        <ReturnDirectlyItem
          attendance={attendance}
          callback={(value) => {
            if (!attendance) return;

            setAttendance({
              ...attendance,
              return_directly_flag: value,
            });
          }}
        />
      </Box>
      <Box>
        <WorkTimeItem
          attendance={attendance}
          callback={({ startTime, endTime, totalTime }) => {
            if (!attendance) return;

            setAttendance({
              ...attendance,
              start_time: startTime.toISOString(),
              end_time: endTime.toISOString(),
            });

            setTotalWorkTime(totalTime);
          }}
        />
      </Box>
      <Box>
        <RestTimeItem
          rests={rests}
          staffId={staff?.id}
          workDate={targetWorkDate}
          callback={(editRests, totalTime) => {
            setRests(editRests);
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
          attendance={attendance}
          callback={(value) => {
            if (!attendance) return;

            setAttendance({
              ...attendance,
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
            <Button variant="contained" sx={{ width: "150px" }}>
              保存
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
