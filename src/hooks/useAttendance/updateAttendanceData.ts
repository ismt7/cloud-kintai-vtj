import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import {
  Attendance,
  UpdateAttendanceInput,
  UpdateAttendanceMutation,
} from "../../API";
import { updateAttendance } from "../../graphql/mutations";

export default async function updateAttendanceData(
  input: UpdateAttendanceInput
) {
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
