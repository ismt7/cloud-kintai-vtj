import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { listStaff } from "../../graphql/queries";
import { ListStaffQuery, Staff } from "../../API";

export default async function fetchStaff(
  cognitoUserId: Staff["cognitoUserId"]
) {
  const response = (await API.graphql({
    query: listStaff,
    variables: { filter: { cognitoUserId: { eq: cognitoUserId } } },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as GraphQLResult<ListStaffQuery>;

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  if (!response.data?.listStaff?.items) {
    throw new Error("スタッフが見つかりませんでした。");
  }

  const staff = response.data.listStaff.items[0] as Staff;
  return staff;
}
