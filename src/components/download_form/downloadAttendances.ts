import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { listAttendances } from "../../graphql/queries";
import {
  Attendance,
  ListAttendancesQuery,
  ModelAttendanceFilterInput,
} from "../../API";

export default async function downloadAttendances(
  $orCondition: ModelAttendanceFilterInput[]
) {
  const response = (await API.graphql({
    query: listAttendances,
    variables: {
      filter: {
        or: $orCondition,
      },
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as GraphQLResult<ListAttendancesQuery>;

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  if (!response.data?.listAttendances) {
    throw new Error("Failed to fetch attendance");
  }

  const attendances: Attendance[] = response.data.listAttendances.items.filter(
    (item): item is NonNullable<typeof item> => item !== null
  );
  return attendances;
}
