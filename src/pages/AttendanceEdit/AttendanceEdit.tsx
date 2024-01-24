import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Container,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import Title from "../../components/Title/Title";
import useStaffs from "../../hooks/useStaffs/useStaffs";
import { useAppDispatchV2 } from "../../app/hooks";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import { E00001, E02001, E02005, S02005 } from "../../errors";
import StaffNameItem from "../../components/attendance_editor/items/StaffNameItem";
import { Staff } from "../../hooks/useStaffs/common";
import useCognitoUser from "../../hooks/useCognitoUser";
import WorkDateItem from "./WorkDateItem";
import useAttendance from "../../hooks/useAttendance/useAttendance";
import { AttendanceEditInputs, defaultValues } from "./common";
import { WorkTimeInput } from "./WorkTimeInput/WorkTimeInput";
import { RestTimeItem } from "./RestTimeItem/RestTimeItem";
import ProductionTimeItem from "../../components/attendance_editor/items/ProductionTimeItem";
import { calcTotalWorkTime } from "../../components/attendance_editor/items/WorkTimeItem/WorkTimeItem";
import { calcTotalRestTime } from "../../components/attendance_editor/items/RestTimeItem/RestTimeItem";
import sendChangeRequestMail from "./sendChangeRequestMail";

export default function AttendanceEdit() {
  const navigate = useNavigate();
  const dispatch = useAppDispatchV2();
  const { targetWorkDate } = useParams();

  const [staff, setStaff] = useState<Staff | undefined | null>(undefined);
  const [totalProductionTime, setTotalProductionTime] = useState<number>(0);

  const { staffs, loading: staffsLoading, error: staffSError } = useStaffs();
  const { cognitoUser, loading: cognitoUserLoading } = useCognitoUser();
  const { attendance, getAttendance, updateAttendance, createAttendance } =
    useAttendance();

  const { register, control, setValue, getValues, watch, handleSubmit } =
    useForm<AttendanceEditInputs>({
      mode: "onChange",
      defaultValues,
    });

  const {
    fields: restFields,
    append: restAppend,
    remove: restRemove,
  } = useFieldArray({
    control,
    name: "rests",
  });

  const onSubmit = async (data: AttendanceEditInputs) => {
    if (attendance) {
      updateAttendance({
        id: attendance.id,
        changeRequests: [
          {
            startTime: data.startTime,
            endTime: data.endTime,
            goDirectlyFlag: data.goDirectlyFlag,
            returnDirectlyFlag: data.returnDirectlyFlag,
            rests: data.rests,
            remarks: data.remarks,
            paidHolidayFlag: data.paidHolidayFlag,
          },
        ],
        revision: attendance.revision,
      })
        .then(() => {
          dispatch(setSnackbarSuccess(S02005));

          if (!cognitoUser) return;
          sendChangeRequestMail(
            cognitoUser,
            dayjs(attendance.workDate),
            staffs
          );

          navigate("/attendance/list");
        })
        .catch(() => dispatch(setSnackbarError(E02005)));
    } else {
      if (!staff || !targetWorkDate) return;

      createAttendance({
        staffId: staff.sub,
        workDate: dayjs(targetWorkDate).format("YYYY-MM-DD"),
        changeRequests: [
          {
            startTime: data.startTime,
            endTime: data.endTime,
            goDirectlyFlag: data.goDirectlyFlag,
            returnDirectlyFlag: data.returnDirectlyFlag,
            rests: data.rests,
            remarks: data.remarks,
            paidHolidayFlag: data.paidHolidayFlag,
          },
        ],
      })
        .then(() => {
          dispatch(setSnackbarSuccess(S02005));

          if (!cognitoUser) return;
          sendChangeRequestMail(cognitoUser, dayjs(targetWorkDate), staffs);
          navigate("/attendance/list");
        })
        .catch(() => dispatch(setSnackbarError(E02005)));
    }
  };

  useEffect(() => {
    if (!cognitoUser?.id) return;
    const { id: staffId } = cognitoUser;
    const matchStaff = staffs.find((s) => s.sub === staffId);
    setStaff(matchStaff || null);
  }, [staffs, cognitoUser]);

  useEffect(() => {
    if (!staff || !targetWorkDate) return;

    getAttendance(staff.sub, dayjs(targetWorkDate).format("YYYY-MM-DD"))
      .then((res) => {
        if (!res) return;

        setValue("startTime", res.startTime);
        setValue("endTime", res.endTime);
        setValue("paidHolidayFlag", res.paidHolidayFlag || false);
        setValue("goDirectlyFlag", res.goDirectlyFlag || false);
        setValue("returnDirectlyFlag", res.returnDirectlyFlag || false);
        setValue("remarks", res.remarks);
        setValue(
          "rests",
          res.rests
            ? res.rests
                .filter(
                  (item): item is NonNullable<typeof item> => item !== null
                )
                .map((item) => ({
                  startTime: item.startTime,
                  endTime: item.endTime,
                }))
            : []
        );
      })
      .catch(() => {
        dispatch(setSnackbarError(E02001));
      });
  }, [staff, targetWorkDate]);

  useEffect(() => {
    if (!attendance) return;
    setValue("paidHolidayFlag", attendance.paidHolidayFlag);
  }, [attendance]);

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

  if (!targetWorkDate) {
    return null;
  }

  if (staffsLoading || cognitoUserLoading) {
    return <LinearProgress />;
  }

  if (staffSError) {
    dispatch(setSnackbarError(E00001));
    return null;
  }

  const changeRequests = attendance?.changeRequests
    ? attendance.changeRequests
        .filter((item): item is NonNullable<typeof item> => item !== null)
        .filter((item) => !item.completed)
    : [];

  return (
    <Container maxWidth="xl" sx={{ pt: 1 }}>
      <Stack spacing={2}>
        <Breadcrumbs>
          <Link to="/" color="inherit">
            TOP
          </Link>
          <Link to={"/attendance/list"} color="inherit">
            勤怠一覧
          </Link>
          {targetWorkDate && (
            <Typography color="text.primary">
              {dayjs(targetWorkDate).format("YYYY/MM/DD")}
            </Typography>
          )}
        </Breadcrumbs>
        <Title text="勤怠編集" />
        {changeRequests.length > 0 && (
          <Alert severity="warning">
            変更リクエスト申請中です。承認されるまで新しい申請はできません。
          </Alert>
        )}

        {changeRequests.length === 0 && (
          <Stack spacing={2} sx={{ px: 30 }}>
            {!attendance && (
              <Box>
                <Alert severity="info">
                  <AlertTitle>お知らせ</AlertTitle>
                  指定された日付に勤怠情報の登録がありませんでした。保存時に新規作成されます。
                </Alert>
              </Box>
            )}
            <WorkDateItem
              workDate={targetWorkDate ? dayjs(targetWorkDate) : null}
            />
            <StaffNameItem staff={staff} />
            <Stack direction="row" alignItems={"center"}>
              <Typography
                variant="body1"
                sx={{ width: "150px", fontWeight: "bold" }}
              >
                有給休暇
              </Typography>
              <Controller
                name="paidHolidayFlag"
                control={control}
                render={({ field }) => (
                  <Checkbox checked={field.value || false} {...field} />
                )}
              />
            </Stack>
            <Stack direction="row" alignItems={"center"}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", width: "150px" }}
              >
                直行
              </Typography>
              <Controller
                name="goDirectlyFlag"
                control={control}
                render={({ field }) => (
                  <Checkbox checked={field.value || false} {...field} />
                )}
              />
            </Stack>
            <Stack direction="row" alignItems={"center"}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", width: "150px" }}
              >
                直帰
              </Typography>
              <Controller
                name="returnDirectlyFlag"
                control={control}
                render={({ field }) => (
                  <Checkbox checked={field.value || false} {...field} />
                )}
              />
            </Stack>
            <WorkTimeInput
              targetWorkDate={targetWorkDate ? dayjs(targetWorkDate) : null}
              control={control}
              watch={watch}
              setValue={setValue}
              getValues={getValues}
            />
            <Stack direction="row">
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", width: "150px" }}
              >
                休憩時間
              </Typography>
              <Stack spacing={1} sx={{ flexGrow: 2 }}>
                {restFields.length === 0 && (
                  <Typography variant="body1">休憩時間はありません</Typography>
                )}
                {restFields.map((_, index) => (
                  <RestTimeItem
                    key={index}
                    targetWorkDate={
                      targetWorkDate ? dayjs(targetWorkDate) : null
                    }
                    index={index}
                    watch={watch}
                    remove={restRemove}
                    control={control}
                    setValue={setValue}
                  />
                ))}
                <Box>
                  <IconButton
                    aria-label="staff-search"
                    onClick={() =>
                      restAppend({
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
              <ProductionTimeItem time={totalProductionTime} />
            </Box>
            <Box>
              <Stack direction="row" alignItems={"center"}>
                <Box sx={{ fontWeight: "bold", width: "150px" }}>備考</Box>
                <Box sx={{ flexGrow: 2 }}>
                  <TextField
                    multiline
                    minRows={2}
                    fullWidth
                    placeholder="備考欄：客先名やイベント名などを記載"
                    sx={{ width: 1 }}
                    {...register("remarks")}
                  />
                </Box>
              </Stack>
            </Box>
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
                    申請
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
