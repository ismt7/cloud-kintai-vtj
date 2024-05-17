import { Button, Stack } from "@mui/material";
import dayjs from "dayjs";
import {
  Control,
  FieldArrayMethodProps,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { Attendance } from "../../../API";
import Title from "../../../components/Title/Title";
import { StaffType } from "../../../hooks/useStaffs/useStaffs";
import AttendanceEditBreadcrumb from "../AttendanceEditBreadcrumb";
import { AttendanceEditInputs, RestInputs } from "../common";
import NoDataAlert from "../DesktopEditor/NoDataAlert";
import { GoDirectlyFlagInput } from "./GoDirectlyFlagInput";
import { Label } from "./Label";
import { PaidHolidayFlagInput } from "./PaidHolidayFlagInput";
import RemarksInput from "./RemarksInput";
import { RestTimeInput } from "./RestTimeInput/RestTimeInput";
import { ReturnDirectlyFlagInput } from "./ReturnDirectlyFlagInput";
import { StaffNameItem } from "./StaffNameItem";
import { WorkDateItem } from "./WorkDateItem";
import { WorkTimeInput } from "./WorkTimeInput/WorkTimeInput";

type AttendanceEditProps = {
  workDate: dayjs.Dayjs;
  attendance: Attendance | null | undefined;
  staff: StaffType | undefined | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
  setValue: UseFormSetValue<AttendanceEditInputs>;
  getValues: UseFormGetValues<AttendanceEditInputs>;
  watch: UseFormWatch<AttendanceEditInputs>;
  restFields: FieldArrayWithId<AttendanceEditInputs, "rests", "id">[];
  restAppend: (
    value: RestInputs | RestInputs[],
    options?: FieldArrayMethodProps | undefined
  ) => void;
  restRemove: UseFieldArrayRemove;
  restUpdate: UseFieldArrayUpdate<AttendanceEditInputs, "rests">;
  register: UseFormRegister<AttendanceEditInputs>;
  handleSubmit: UseFormHandleSubmit<AttendanceEditInputs, undefined>;
  onSubmit: (data: AttendanceEditInputs) => Promise<void>;
};

export function MobileEditor({
  workDate,
  attendance,
  staff,
  control,
  setValue,
  getValues,
  watch,
  restFields,
  restAppend,
  restRemove,
  restUpdate,
  register,
  handleSubmit,
  onSubmit,
}: AttendanceEditProps) {
  if (!staff) return null;

  return (
    <Stack direction="column" spacing={1} sx={{ p: 1 }}>
      <AttendanceEditBreadcrumb workDate={workDate} />
      <Title>勤怠編集</Title>
      <Stack direction="column" spacing={2} sx={{ p: 1 }}>
        <NoDataAlert attendance={attendance} />

        {/* 勤務日 */}
        <WorkDateItem workDate={workDate} />

        {/* スタッフ */}
        <StaffNameItem staff={staff} />

        {/* 有給休暇 */}
        <PaidHolidayFlagInput control={control} />

        {/* 直行 */}
        <GoDirectlyFlagInput control={control} />

        {/* 直帰 */}
        <ReturnDirectlyFlagInput control={control} />

        {/* 勤務時間 */}
        <WorkTimeInput
          workDate={workDate}
          control={control}
          setValue={setValue}
          getValues={getValues}
          watch={watch}
        />

        {/* 休憩時間 */}
        <RestTimeInput
          restFields={restFields}
          workDate={workDate}
          control={control}
          restAppend={restAppend}
          restRemove={restRemove}
          restUpdate={restUpdate}
        />

        {/* 備考 */}
        <Label>備考</Label>
        <RemarksInput register={register} />

        {/* 申請ボタン */}
        <RequestButtonItem handleSubmit={handleSubmit} onSubmit={onSubmit} />
      </Stack>
    </Stack>
  );
}

function RequestButtonItem({
  handleSubmit,
  onSubmit,
}: {
  handleSubmit: UseFormHandleSubmit<AttendanceEditInputs, undefined>;
  onSubmit: (data: AttendanceEditInputs) => Promise<void>;
}) {
  return (
    <Button variant="contained" size="medium" onClick={handleSubmit(onSubmit)}>
      申請
    </Button>
  );
}
