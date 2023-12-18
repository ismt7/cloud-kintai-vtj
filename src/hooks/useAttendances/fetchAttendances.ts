import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import dayjs from "dayjs";
import { Attendance, ListAttendancesQuery } from "../../API";
import { listAttendances } from "../../graphql/queries";

export default async function fetchAttendances(staffId: string) {
  const now = dayjs();
  const dateList = Array.from({ length: 30 }, (_, i) =>
    now.subtract(i, "day").format("YYYY-MM-DD")
  ).sort();

  const response = (await API.graphql({
    query: listAttendances,
    variables: {
      filter: {
        staffId: {
          eq: staffId,
        },
      },
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as GraphQLResult<ListAttendancesQuery>;

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  if (!response.data.listAttendances) {
    throw new Error("Failed to fetch attendance");
  }

  const attendances: Attendance[] = response.data.listAttendances.items.filter(
    (item): item is NonNullable<typeof item> => item !== null
  );
  return dateList.map((targetDate): Attendance => {
    const matchAttendance = attendances.find(
      (attendance) => attendance.workDate === targetDate
    );

    return {
      __typename: "Attendance",
      id: matchAttendance?.id ?? "",
      staffId: matchAttendance?.staffId ?? "",
      workDate: targetDate,
      startTime: matchAttendance?.startTime ?? "",
      endTime: matchAttendance?.endTime ?? "",
      goDirectlyFlag: matchAttendance?.goDirectlyFlag ?? false,
      returnDirectlyFlag: matchAttendance?.returnDirectlyFlag ?? false,
      rests: matchAttendance?.rests ?? [],
      remarks: matchAttendance?.remarks ?? "",
      createdAt: matchAttendance?.createdAt ?? "",
      updatedAt: matchAttendance?.updatedAt ?? "",
    };
  });
}
