import dayjs from "dayjs";
import { createContext } from "react";
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { Attendance, AttendanceChangeRequest } from "@/API";
import { StaffType } from "@/hooks/useStaffs/useStaffs";

import { AttendanceEditInputs } from "./common";

type AttendanceEditContextProps = {
  workDate: dayjs.Dayjs | null | undefined;
  attendance: Attendance | null | undefined;
  staff: StaffType | null | undefined;
  onSubmit: (data: AttendanceEditInputs) => Promise<void>;
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  restFields: FieldArrayWithId<AttendanceEditInputs, "rests", "id">[];
  changeRequests: AttendanceChangeRequest[];
  restAppend?: UseFieldArrayAppend<AttendanceEditInputs, "rests">;
  restRemove?: UseFieldArrayRemove;
  restUpdate?: UseFieldArrayUpdate<AttendanceEditInputs, "rests">;
  register?: UseFormRegister<AttendanceEditInputs>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<AttendanceEditInputs, any>;
  setValue?: UseFormSetValue<AttendanceEditInputs>;
  getValues?: UseFormGetValues<AttendanceEditInputs>;
  watch?: UseFormWatch<AttendanceEditInputs>;
  handleSubmit?: UseFormHandleSubmit<AttendanceEditInputs, undefined>;
};

export const AttendanceEditContext = createContext<AttendanceEditContextProps>({
  workDate: undefined,
  attendance: undefined,
  staff: undefined,
  onSubmit: async () => {},
  isDirty: false,
  isValid: false,
  isSubmitting: false,
  restFields: [],
  changeRequests: [],
});

export default function AttendanceEditProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AttendanceEditContextProps;
}) {
  return (
    <AttendanceEditContext.Provider value={value}>
      {children}
    </AttendanceEditContext.Provider>
  );
}
