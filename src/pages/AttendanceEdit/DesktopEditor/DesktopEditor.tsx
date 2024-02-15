import { Box, Button, Container, Divider, Stack, styled } from "@mui/material";
import dayjs from "dayjs";
import {
  Control,
  FieldArrayMethodProps,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { Attendance, AttendanceChangeRequest } from "../../../API";
import ProductionTimeItem from "../../../components/attendance_editor/items/ProductionTimeItem";
import StaffNameItem from "../../../components/attendance_editor/items/StaffNameItem";
import Title from "../../../components/Title/Title";
import { StaffType } from "../../../hooks/useStaffs/useStaffs";
import { AttendanceEditInputs, RestInputs } from "../common";
import AttendanceEditBreadcrumb from "./AttendanceEditBreadcrumb";
import ChangeRequestingAlert from "./ChangeRequestingMessage";
import GoDirectlyFlagInput from "./GoDirectlyFlagInput";
import NoDataAlert from "./NoDataAlert";
import PaidHolidayFlagInput from "./PaidHolidayFlagInput";
import RemarksInput from "./RemarksInput";
import RestTimeItem from "./RestTimeItem/RestTimeItem";
import ReturnDirectlyFlagInput from "./ReturnDirectlyFlagInput";
import StaffCommentInput from "./StaffCommentInput";
import WorkDateItem from "./WorkDateItem";
import { WorkTimeInput } from "./WorkTimeInput/WorkTimeInput";

const DesktopContainer = styled(Container)(() => ({
  pt: 1,
  pb: 5,
}));

const BodyStack = styled(Stack)(() => ({
  padding: "0 239px",
}));

const RequestButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  border: `3px solid ${theme.palette.primary.main}`,
  width: 150,
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.contrastText,
  },
  "&:disabled": {
    color: theme.palette.text.disabled,
    backgroundColor: theme.palette.action.disabledBackground,
    border: "3px solid #E0E0E0",
  },
}));

export default function DesktopEditor({
  workDate,
  changeRequests,
  attendance,
  staff,
  control,
  watch,
  setValue,
  getValues,
  restFields,
  restRemove,
  restAppend,
  totalProductionTime,
  register,
  handleSubmit,
  onSubmit,
}: {
  workDate: dayjs.Dayjs;
  changeRequests: AttendanceChangeRequest[];
  attendance: Attendance | null | undefined;
  staff: StaffType | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
  watch: UseFormWatch<AttendanceEditInputs>;
  setValue: UseFormSetValue<AttendanceEditInputs>;
  getValues: UseFormGetValues<AttendanceEditInputs>;
  restFields: FieldArrayWithId<AttendanceEditInputs, "rests", "id">[];
  restRemove: UseFieldArrayRemove;
  restAppend: (
    value: RestInputs | RestInputs[],
    options?: FieldArrayMethodProps | undefined
  ) => void;
  totalProductionTime: number;
  register: UseFormRegister<AttendanceEditInputs>;
  handleSubmit: UseFormHandleSubmit<AttendanceEditInputs, undefined>;
  onSubmit: (data: AttendanceEditInputs) => Promise<void>;
}) {
  if (changeRequests.length > 0) {
    return (
      <DesktopContainer maxWidth="xl">
        <Stack direction="column" spacing={2}>
          <AttendanceEditBreadcrumb workDate={workDate} />
          <Title text="勤怠編集" />
          <ChangeRequestingAlert changeRequests={changeRequests} />
        </Stack>
      </DesktopContainer>
    );
  }

  return (
    <DesktopContainer maxWidth="xl">
      <Stack direction="column" spacing={2}>
        <AttendanceEditBreadcrumb workDate={workDate} />
        <Title text="勤怠編集" />
        <BodyStack spacing={2}>
          <NoDataAlert attendance={attendance} />
          <WorkDateItem workDate={workDate} />
          <StaffNameItem staff={staff} />
          <PaidHolidayFlagInput control={control} />
          <GoDirectlyFlagInput control={control} />
          <ReturnDirectlyFlagInput control={control} />
          <WorkTimeInput
            targetWorkDate={workDate}
            control={control}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
          />
          <RestTimeItem
            restFields={restFields}
            workDate={workDate}
            watch={watch}
            restRemove={restRemove}
            control={control}
            setValue={setValue}
            restAppend={restAppend}
          />
          <ProductionTimeItem time={totalProductionTime} />
          <RemarksInput register={register} />
          <Divider />
          <StaffCommentInput register={register} />
          <Box>
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent={"center"}
              spacing={3}
            >
              <Box>
                <RequestButton onClick={handleSubmit(onSubmit)}>
                  申請
                </RequestButton>
              </Box>
            </Stack>
          </Box>
        </BodyStack>
      </Stack>
    </DesktopContainer>
  );
}
