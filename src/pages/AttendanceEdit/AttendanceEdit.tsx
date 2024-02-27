import { Box, LinearProgress } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatchV2 } from "../../app/hooks";
import { calcTotalRestTime } from "../../components/attendance_editor/items/RestTimeItem/RestTimeItem";
import { calcTotalWorkTime } from "../../components/attendance_editor/items/WorkTimeItem/WorkTimeItem";
import * as MESSAGE_CODE from "../../errors";
import useAttendance from "../../hooks/useAttendance/useAttendance";
import useCognitoUser from "../../hooks/useCognitoUser";
import useStaffs, { StaffType } from "../../hooks/useStaffs/useStaffs";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import { AttendanceEditInputs, defaultValues } from "./common";
import DesktopEditor from "./DesktopEditor/DesktopEditor";
import sendChangeRequestMail from "./sendChangeRequestMail";
import { MobileEditor } from "./MobileEditor/MobileEditor";

export default function AttendanceEdit() {
  const navigate = useNavigate();
  const dispatch = useAppDispatchV2();
  const { targetWorkDate } = useParams();

  const [staff, setStaff] = useState<StaffType | undefined | null>(undefined);
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
    console.log(data);
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
            staffComment: data.staffComment,
          },
        ],
        revision: attendance.revision,
      })
        .then(() => {
          dispatch(setSnackbarSuccess(MESSAGE_CODE.S02005));
          if (!cognitoUser) return;

          try {
            sendChangeRequestMail(
              cognitoUser,
              dayjs(attendance.workDate),
              staffs,
              data.staffComment
            );
          } catch (e) {
            console.log(e);
          }

          navigate("/attendance/list");
        })
        .catch(() => dispatch(setSnackbarError(MESSAGE_CODE.E02005)));
    } else {
      if (!staff || !targetWorkDate) return;

      createAttendance({
        staffId: staff.cognitoUserId,
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
            staffComment: data.staffComment,
          },
        ],
      })
        .then(() => {
          dispatch(setSnackbarSuccess(MESSAGE_CODE.S02005));

          if (!cognitoUser) return;
          sendChangeRequestMail(
            cognitoUser,
            dayjs(targetWorkDate),
            staffs,
            data.staffComment
          );
          navigate("/attendance/list");
        })
        .catch(() => dispatch(setSnackbarError(MESSAGE_CODE.E02005)));
    }
  };

  useEffect(() => {
    if (!cognitoUser?.id) return;
    const { id: staffId } = cognitoUser;
    const matchStaff = staffs.find((s) => s.cognitoUserId === staffId);
    setStaff(matchStaff || null);
  }, [staffs, cognitoUser]);

  useEffect(() => {
    if (!staff || !targetWorkDate) return;

    getAttendance(
      staff.cognitoUserId,
      dayjs(targetWorkDate).format("YYYY-MM-DD")
    )
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
        dispatch(setSnackbarError(MESSAGE_CODE.E02001));
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
    dispatch(setSnackbarError(MESSAGE_CODE.E00001));
    return null;
  }

  const changeRequests = attendance?.changeRequests
    ? attendance.changeRequests
        .filter((item): item is NonNullable<typeof item> => item !== null)
        .filter((item) => !item.completed)
    : [];

  return (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <MobileEditor
          workDate={dayjs(targetWorkDate)}
          attendance={attendance}
          staff={staff}
          control={control}
          setValue={setValue}
          getValues={getValues}
          watch={watch}
          restFields={restFields}
          restAppend={restAppend}
          restRemove={restRemove}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <DesktopEditor
          workDate={dayjs(targetWorkDate)}
          changeRequests={changeRequests}
          attendance={attendance}
          staff={staff}
          control={control}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
          restFields={restFields}
          restRemove={restRemove}
          restAppend={restAppend}
          totalProductionTime={totalProductionTime}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </Box>
    </>
  );
}
