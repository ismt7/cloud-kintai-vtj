import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import { API, Logger } from "aws-amplify";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { Attendance, AttendanceHistory, Rest } from "../../API";
import { useAppDispatchV2 } from "../../app/hooks";
import { E04001, S04001 } from "../../errors";
import useAttendance from "../../hooks/useAttendance/useAttendance";
import { Staff } from "../../hooks/useStaffs/common";
import useStaffs from "../../hooks/useStaffs/useStaffs";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import ProductionTimeItem from "./items/ProductionTimeItem";
import SeparatorItem from "./items/SeparatorItem";
import StaffNameItem from "./items/StaffNameItem";
import WorkDateItem from "./items/WorkDateItem";
// eslint-disable-next-line import/no-cycle
import RemarksItem from "./items/RemarksItem";
// eslint-disable-next-line import/no-cycle
import { calcTotalRestTime, RestTimeItem } from "./items/RestTimeItem";
// eslint-disable-next-line import/no-cycle
import { calcTotalWorkTime, WorkTimeItem } from "./items/WorkTimeItem";
import Title from "../Title/Title";
// eslint-disable-next-line import/no-cycle
import EditAttendanceHistoryList from "./EditAttendanceHistoryList";
import { sendMail } from "../../graphql/queries";
import getAttendanceMailBody from "./attendanceMailTemplate";

export type RestInputs = {
  startTime: Rest["startTime"] | null;
  endTime: Rest["endTime"] | null;
};

export type AttendanceEditorInputs = {
  workDate: Attendance["workDate"] | null;
  goDirectlyFlag: Attendance["goDirectlyFlag"];
  returnDirectlyFlag: Attendance["returnDirectlyFlag"];
  startTime: Attendance["startTime"];
  endTime: Attendance["endTime"];
  remarks: Attendance["remarks"];
  paidHolidayFlag: Attendance["paidHolidayFlag"];
  rests: RestInputs[];
  histories: AttendanceHistory[];
  revision: Attendance["revision"];
};

const defaultValues: AttendanceEditorInputs = {
  workDate: null,
  goDirectlyFlag: false,
  returnDirectlyFlag: false,
  startTime: null,
  endTime: null,
  remarks: "",
  paidHolidayFlag: false,
  rests: [],
  histories: [],
  revision: 0,
};

export default function AttendanceEditor() {
  const dispatch = useAppDispatchV2();

  const { targetWorkDate, staffId: targetStaffId } = useParams();
  const { staffs, loading: staffsLoading, error: staffSError } = useStaffs();
  const { attendance, getAttendance, updateAttendance, createAttendance } =
    useAttendance();
  const [staff, setStaff] = useState<Staff | undefined | null>(undefined);
  const [workDate, setWorkDate] = useState<dayjs.Dayjs | null>(null);

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
    if (!targetStaffId) return;
    const matchStaff = staffs.find((s) => s.sub === targetStaffId);
    setStaff(matchStaff || null);
  }, [staffs, targetStaffId]);

  useEffect(() => {
    if (!staff || !targetStaffId || !targetWorkDate) return;

    setWorkDate(dayjs(targetWorkDate));

    getAttendance(staff.sub, dayjs(targetWorkDate).format("YYYY-MM-DD")).catch(
      (e: Error) => {
        logger.error(e);
        console.log(e);
      }
    );
  }, [staff, targetStaffId, targetWorkDate]);

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
    if (attendance) {
      await updateAttendance({
        id: attendance.id,
        staffId: attendance.staffId,
        workDate: data.workDate,
        startTime: data.startTime,
        endTime: data.endTime || null,
        goDirectlyFlag: data.goDirectlyFlag,
        returnDirectlyFlag: data.returnDirectlyFlag,
        remarks: data.remarks,
        rests: data.rests,
        paidHolidayFlag: data.paidHolidayFlag,
        revision: data.revision,
      })
        .then((res) => {
          dispatch(setSnackbarSuccess(S04001));

          if (!staff || !res.histories) return;

          const latestHistory = res.histories
            .filter((item): item is NonNullable<typeof item> => item !== null)
            .sort((a, b) => {
              if (a.createdAt === b.createdAt) return 0;
              return a.createdAt < b.createdAt ? 1 : -1;
            })[0];

          void API.graphql({
            query: sendMail,
            variables: {
              data: {
                to: [staff.mailAddress],
                subject: `勤怠情報変更のお知らせ - ${dayjs(res.workDate).format(
                  "YYYY/MM/DD"
                )}`,
                body: getAttendanceMailBody(staff, res, latestHistory).join(
                  "\n"
                ),
              },
            },
          });
        })
        .catch((e: Error) => {
          logger.error(e);
          dispatch(setSnackbarError(E04001));
        });

      return;
    }

    if (!targetStaffId || !targetWorkDate) return;

    createAttendance({
      staffId: targetStaffId,
      workDate: dayjs(targetWorkDate).format("YYYY-MM-DD"),
      startTime: data.startTime,
      endTime: data.endTime,
      goDirectlyFlag: data.goDirectlyFlag,
      returnDirectlyFlag: data.returnDirectlyFlag,
      remarks: data.remarks,
      rests: data.rests,
      paidHolidayFlag: data.paidHolidayFlag,
    })
      .then(() => {
        dispatch(setSnackbarSuccess(S04001));
      })
      .catch((e: Error) => {
        logger.error(e);
        dispatch(setSnackbarError(E04001));
      });
  };

  useEffect(() => {
    if (!attendance) return;

    setWorkDate(dayjs(attendance.workDate));

    setValue("workDate", attendance.workDate);
    setValue("startTime", attendance.startTime);
    setValue("endTime", attendance.endTime);
    setValue("remarks", attendance.remarks || "");
    setValue("goDirectlyFlag", attendance.goDirectlyFlag || false);
    setValue("returnDirectlyFlag", attendance.returnDirectlyFlag || false);
    setValue("paidHolidayFlag", attendance.paidHolidayFlag || false);
    setValue("revision", attendance.revision);

    if (attendance.rests) {
      const rests = attendance.rests
        .filter((item): item is NonNullable<typeof item> => item !== null)
        .map((item) => ({
          startTime: item.startTime,
          endTime: item.endTime,
        }));
      setValue("rests", rests);
    }

    if (attendance.histories) {
      const histories = attendance.histories.filter(
        (item): item is NonNullable<typeof item> => item !== null
      );
      setValue("histories", histories);
    }
  }, [attendance]);

  if (staffsLoading || attendance === undefined) {
    return <LinearProgress />;
  }

  if (staffSError) {
    return (
      <Alert severity="error">
        <AlertTitle>エラー</AlertTitle>
        <Typography variant="body2">{staffSError.message}</Typography>
      </Alert>
    );
  }

  if (!targetStaffId) {
    return (
      <Alert severity="error">
        <AlertTitle>エラー</AlertTitle>
        <Typography variant="body2">スタッフが指定されていません。</Typography>
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      <Box>
        <Breadcrumbs>
          <Link to="/" color="inherit">
            TOP
          </Link>
          <Link to="/admin/attendances" color="inherit">
            勤怠管理
          </Link>
          <Link to={`/admin/staff/${targetStaffId}/attendance`} color="inherit">
            勤怠一覧
          </Link>
          {workDate && (
            <Typography color="text.primary">
              {workDate.format("YYYY/MM/DD")}
            </Typography>
          )}
        </Breadcrumbs>
      </Box>
      <Box>
        <Title text="勤怠編集" />
      </Box>
      <Stack spacing={2} sx={{ px: 30 }}>
        {/* TODO: #182 勤怠編集画面で前後の日付に移動できるようにする */}
        {/* TODO: #183 勤怠編集画面で指定日付に移動できるようにする */}
        <Box>
          {errors.startTime && (
            <Box>
              <Alert severity="error">
                <AlertTitle>入力内容に誤りがあります。</AlertTitle>
                <Typography variant="body2">
                  {errors.startTime.message}
                </Typography>
              </Alert>
            </Box>
          )}
          {!attendance && (
            <Box>
              <Alert severity="info">
                <AlertTitle>お知らせ</AlertTitle>
                指定された日付に勤怠情報の登録がありませんでした。保存時に新規作成されます。
              </Alert>
            </Box>
          )}
        </Box>
        <EditAttendanceHistoryList getValues={getValues} />
        <Box>
          <WorkDateItem staffId={targetStaffId} workDate={workDate} />
        </Box>
        <Box>
          <StaffNameItem staff={staff} />
        </Box>
        <Box>
          <Stack direction="row" alignItems={"center"}>
            <Box sx={{ fontWeight: "bold", width: "150px" }}>有給休暇</Box>
            <Box>
              <Controller
                name="paidHolidayFlag"
                control={control}
                render={({ field }) => (
                  <Checkbox checked={field.value || false} {...field} />
                )}
              />
            </Box>
          </Stack>
        </Box>
        <Stack direction="row" alignItems={"center"}>
          <Box sx={{ fontWeight: "bold", width: "150px" }}>直行</Box>
          <Box>
            <Controller
              name="goDirectlyFlag"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value || false} {...field} />
              )}
            />
          </Box>
        </Stack>
        <Stack direction="row" alignItems={"center"}>
          <Box sx={{ fontWeight: "bold", width: "150px" }}>直帰</Box>
          <Box>
            <Controller
              name="returnDirectlyFlag"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value || false} {...field} />
              )}
            />
          </Box>
        </Stack>
        <WorkTimeItem
          targetWorkDate={workDate}
          control={control}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
        />
        <Stack direction="row">
          <Box sx={{ fontWeight: "bold", width: "150px" }}>休憩時間</Box>
          <Stack spacing={1} sx={{ flexGrow: 2 }}>
            {fields.length === 0 && (
              <Box>
                <Typography variant="body1">休憩時間はありません</Typography>
              </Box>
            )}
            {fields.map((_, index) => (
              <RestTimeItem
                key={index}
                targetWorkDate={workDate}
                index={index}
                watch={watch}
                remove={remove}
                control={control}
                setValue={setValue}
                getValues={getValues}
              />
            ))}
            <Box>
              <IconButton
                aria-label="staff-search"
                onClick={() =>
                  append({
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
    </Stack>
  );
}
