import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import { ListStaffQuery, Staff } from "../../API";
import { listStaff } from "../../graphql/queries";

export default async function fetchStaffs() {
  const response = (await API.graphql({
    query: listStaff,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as GraphQLResult<ListStaffQuery>;

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  if (!response.data?.listStaff) {
    throw new Error("No data returned");
  }

  const staffs: Staff[] = response.data.listStaff.items.filter(
    (item): item is NonNullable<typeof item> => !!item
  );

  return staffs;
}
