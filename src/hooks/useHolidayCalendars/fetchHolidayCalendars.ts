import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import { HolidayCalendar, ListHolidayCalendarsQuery } from "../../API";
import { listHolidayCalendars } from "../../graphql/queries";

export default async function fetchHolidayCalendars() {
  const response = (await API.graphql({
    query: listHolidayCalendars,
    variables: { limit: 1000 },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as GraphQLResult<ListHolidayCalendarsQuery>;

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  if (!response.data?.listHolidayCalendars) {
    return [];
  }

  const holidayCalendars: HolidayCalendar[] =
    response.data.listHolidayCalendars.items.filter(
      (item): item is NonNullable<typeof item> => item !== null
    );

  return holidayCalendars;
}
