import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import { Attendance, ListAttendancesQuery } from "../../API";
import { listAttendances } from "../../graphql/queries";

export default async function fetchAttendance(
  staffId: string,
  workDate: string
) {
  const attendances: Attendance[] = [];
  let nextToken: string | null = null;
  const isLooping = true;
  while (isLooping) {
    const response = (await API.graphql({
      query: listAttendances,
      variables: {
        filter: {
          staffId: {
            eq: staffId,
          },
          workDate: {
            eq: workDate,
          },
        },
        nextToken,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<ListAttendancesQuery>;

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    if (!response.data?.listAttendances) {
      throw new Error("Failed to fetch attendance");
    }

    attendances.push(
      ...response.data.listAttendances.items.filter(
        (item): item is NonNullable<typeof item> => item !== null
      )
    );

    if (response.data.listAttendances.nextToken) {
      nextToken = response.data.listAttendances.nextToken;
      continue;
    }

    break;
  }

  if (attendances.length === 0) {
    return null;
  }

  if (attendances.length > 1) {
    throw new Error("Failed to fetch attendance");
  }

  return attendances[0];
}
