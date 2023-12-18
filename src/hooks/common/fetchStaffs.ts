/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { API, Auth } from "aws-amplify";
import { Staff } from "../useStaffs/common";

export default async function fetchStaffs(): Promise<Staff[]> {
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: (await Auth.currentSession())
        .getAccessToken()
        .getJwtToken(),
    },
  };

  const response = await API.get("AdminQueries", "/listUsers", params);

  return response.Users.map((user: any) => ({
    sub: user.Attributes.find((attr: any) => attr.Name === "sub")?.Value,
    givenName: user.Attributes.find((attr: any) => attr.Name === "given_name")
      ?.Value,
    familyName: user.Attributes.find((attr: any) => attr.Name === "family_name")
      ?.Value,
    mailAddress: user.Attributes.find((attr: any) => attr.Name === "email")
      ?.Value,
  }));
}
