import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import {
  Attendance,
  CreateAttendanceInput,
  CreateAttendanceMutation,
} from "../../API";
import { createAttendance } from "../../graphql/mutations";

export default async function createAttendanceData(
  input: CreateAttendanceInput
) {
  input.revision = 1;

  const response = (await API.graphql({
    query: createAttendance,
    variables: { input },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as GraphQLResult<CreateAttendanceMutation>;

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  if (!response.data?.createAttendance) {
    throw new Error("Failed to create attendance");
  }

  const attendance: Attendance = response.data.createAttendance;
  return attendance;
}
