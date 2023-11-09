import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAttendance from "./hooks/useAttendance";
import useLoginStaff from "./hooks/useLoginStaff";
import useRests from "./hooks/useRests";
import useStaff from "./hooks/useStaff";
import ProductionTimeItem from "./items/ProductionTimeItem";
import SeparatorItem from "./items/SeparatorItem";
import StaffNameItem from "./items/StaffNameItem";
import WorkDateItem from "./items/WorkDateItem";

// TODO: あとで修正
// eslint-disable-next-line import/no-cycle
import RemarksItem from "./items/RemarksItem";
// eslint-disable-next-line import/no-cycle
import { calcTotalRestTime, RestTimeItem } from "./items/RestTimeItem";
// eslint-disable-next-line import/no-cycle
import { Logger } from "aws-amplify";
import { useAppDispatchV2 } from "../../app/hooks";
import { E00001 } from "../../errors";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import { calcTotalWorkTime, WorkTimeItem } from "./items/WorkTimeItem";

type RestInputs = {
  restId: number | null | undefined;
  startTime: string | null | undefined;
  endTime: string | null | undefined;
};

export type AttendanceEditorInputs = {
  workDate: string;
  goDirectlyFlag: boolean;
  returnDirectlyFlag: boolean;
  startTime: string | null | undefined;
  endTime: string | null | undefined;
  remarks: string;
  rests: RestInputs[];
};

const defaultValues: AttendanceEditorInputs = {
  workDate: "",
  goDirectlyFlag: false,
  returnDirectlyFlag: false,
  startTime: null,
  endTime: null,
  remarks: "",
  rests: [],
};

export default function AttendanceEditor({
  cognitoUserId,
}: {
  cognitoUserId: string | undefined;
}) {
  const dispatch = useAppDispatchV2();
  const navigate = useNavigate();

  const { targetWorkDate, staffId: targetStaffId } = useParams();
  const { loginStaff, loading: loginStaffLoading } =
    useLoginStaff(cognitoUserId);
  const { staff, loading: staffLoading } = useStaff(loginStaff, targetStaffId);
  const {
    attendance,
    loading: attendanceLoading,
    updateAttendance,
  } = useAttendance(staff, targetWorkDate);
  const {
    rests,
    loading: restLoading,
    createRest,
    updateRest,
    deleteRest,
  } = useRests(staff, targetWorkDate);

  const [totalProductionTime, setTotalProductionTime] = useState<number>(0);

  const logger = new Logger(
    "AttendanceEditor",
    process.env.NODE_ENV === "development" ? "DEBUG" : "ERROR"
  );

  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<AttendanceEditorInputs>({
    mode: "onChange",
    defaultValues,
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "rests",
  });

  useEffect(() => {
    watch((data) => {
      const totalWorkTime = calcTotalWorkTime(data.startTime, data.endTime);

      const totalRestTime =
        data.rests?.reduce((acc, rest) => {
          if (!rest) return acc;

          const diff = calcTotalRestTime(rest.startTime, rest.endTime);
          return acc + diff;
        }, 0) ?? 0;

      const totalTime = totalWorkTime - totalRestTime;
      setTotalProductionTime(totalTime);
    });
  }, [watch]);

  const onSubmit = async (data: AttendanceEditorInputs) => {
    if (!staff || !attendance) {
      dispatch(setSnackbarError(E00001));
      return;
    }

    const workDate = dayjs(targetWorkDate).format("YYYY-MM-DD");
    await Promise.all([
      // 勤怠情報
      updateAttendance({
        ...attendance,
        start_time: data.startTime,
        end_time: data.endTime || null,
        go_directly_flag: data.goDirectlyFlag,
        return_directly_flag: data.returnDirectlyFlag,
        remarks: data.remarks,
      }).catch((e) => {
        logger.debug(e);
        throw e;
      }),

      // 休憩情報(新規)
      data.rests
        .filter((rest) => !rest.restId)
        .forEach((rest) => {
          createRest({
            staff_id: staff.id,
            work_date: workDate,
            start_time: rest.startTime,
            end_time: rest.endTime,
          }).catch((e) => {
            throw e;
          });
        }),

      // 休憩情報(更新)
      data.rests
        .filter((rest) => rest.restId)
        .forEach((rest) => {
          if (!rest.restId) {
            throw new Error("restId is null");
          }

          const targetRest = rests?.find((r) => r.id === rest.restId);
          if (!targetRest) {
            throw new Error("targetRest is null");
          }

          updateRest({
            ...targetRest,
            id: rest.restId,
            start_time: rest.startTime,
            end_time: rest.endTime,
          }).catch((e) => {
            throw e;
          });
        }),

      // 休憩情報(削除)
      rests
        ?.filter(
          (rest) =>
            !data.rests.some((restInput) => rest.id === restInput.restId)
        )
        .forEach((rest) => {
          deleteRest(rest).catch((e) => {
            throw e;
          });
        }),
    ])
      .then(() => {
        dispatch(setSnackbarSuccess());
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (!attendance) return;

    setValue("workDate", attendance.work_date);
    setValue("startTime", attendance.start_time);
    setValue("endTime", attendance.end_time);
    setValue("remarks", attendance.remarks || "");
    setValue("goDirectlyFlag", attendance.go_directly_flag || false);
    setValue("returnDirectlyFlag", attendance.return_directly_flag || false);
  }, [attendance]);

  useEffect(() => {
    if (!rests) return;

    setValue(
      "rests",
      rests.map((rest) => ({
        restId: rest.id,
        startTime: rest.start_time,
        endTime: rest.end_time,
      }))
    );
  }, [rests]);

  if (loginStaffLoading || staffLoading || attendanceLoading || restLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack spacing={2}>
      {errors.startTime && (
        <Box>
          <Alert severity="error">
            <AlertTitle>入力内容に誤りがあります。</AlertTitle>
            <Typography variant="body2">{errors.startTime.message}</Typography>
          </Alert>
        </Box>
      )}
      <Box>
        <StaffNameItem staff={staff} />
      </Box>
      <Box>
        <WorkDateItem workDate={getValues().workDate} />
      </Box>
      <Stack direction="row" alignItems={"center"}>
        <Box sx={{ fontWeight: "bold", width: "150px" }}>直行</Box>
        <Box>
          <Checkbox {...register("goDirectlyFlag")} />
        </Box>
      </Stack>
      <Stack direction="row" alignItems={"center"}>
        <Box sx={{ fontWeight: "bold", width: "150px" }}>直帰</Box>
        <Box>
          <Checkbox {...register("returnDirectlyFlag")} />
        </Box>
      </Stack>
      <WorkTimeItem
        targetWorkDate={dayjs(targetWorkDate)}
        control={control}
        watch={watch}
      />
      <Stack direction="row">
        <Box sx={{ fontWeight: "bold", width: "150px" }}>休憩時間</Box>
        <Stack spacing={1} sx={{ flexGrow: 2 }}>
          {fields.length === 0 && (
            <Box>
              <Typography variant="body1">休憩時間はありません。</Typography>
            </Box>
          )}
          {fields.map((field, index) => (
            <RestTimeItem
              key={index}
              targetWorkDate={dayjs(targetWorkDate)}
              index={index}
              watch={watch}
              remove={remove}
              control={control}
            />
          ))}
          <Box>
            <IconButton
              aria-label="staff-search"
              onClick={() =>
                append({
                  restId: null,
                  startTime: null,
                  endTime: null,
                })
              }
            >
              <AddAlarmIcon />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
      <Box>
        <SeparatorItem />
      </Box>
      <Box>
        <ProductionTimeItem time={totalProductionTime} />
      </Box>
      <Box>
        <RemarksItem register={register} />
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
              onClick={handleSubmit(onSubmit)}
            >
              保存
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
