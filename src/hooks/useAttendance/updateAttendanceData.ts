import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import {
  Attendance,
  AttendanceHistoryInput,
  GetAttendanceQuery,
  UpdateAttendanceInput,
  UpdateAttendanceMutation,
} from "../../API";
import { updateAttendance } from "../../graphql/mutations";
import { getAttendance } from "../../graphql/queries";

export default async function updateAttendanceData(
  input: UpdateAttendanceInput
) {
  const currentAttendanceResponse = (await API.graphql({
    query: getAttendance,
    variables: { id: input.id },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as GraphQLResult<GetAttendanceQuery>;

  if (currentAttendanceResponse.errors) {
    throw new Error(currentAttendanceResponse.errors[0].message);
  }

  if (!currentAttendanceResponse.data?.getAttendance) {
    throw new Error("Failed to get attendance");
  }

  const currentAttendance: Attendance =
    currentAttendanceResponse.data.getAttendance;

  console.log("currentAttendance", currentAttendance);

  const history: AttendanceHistoryInput = {
    staffId: currentAttendance.staffId,
    workDate: currentAttendance.workDate,
    startTime: currentAttendance.startTime,
    endTime: currentAttendance.endTime,
    goDirectlyFlag: currentAttendance.goDirectlyFlag,
    returnDirectlyFlag: currentAttendance.returnDirectlyFlag,
    rests: currentAttendance.rests
      ? currentAttendance.rests
          .filter((item): item is NonNullable<typeof item> => !!item)
          .map((rest) => ({
            startTime: rest.startTime,
            endTime: rest.endTime,
          }))
      : [],
    remarks: currentAttendance.remarks,
    paidHolidayFlag: currentAttendance.paidHolidayFlag,
    createdAt: currentAttendance.updatedAt,
  };

  if (input.histories && input.histories.length > 0) {
    input.histories.push(history);
  } else {
    input.histories = [history];
  }

  console.log("input", input);

  const response = (await API.graphql({
    query: updateAttendance,
    variables: { input },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as GraphQLResult<UpdateAttendanceMutation>;

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  if (!response.data?.updateAttendance) {
    throw new Error("Failed to update attendance");
  }

  const attendance: Attendance = response.data.updateAttendance;
  return attendance;
}
