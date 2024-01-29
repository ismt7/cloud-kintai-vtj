/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { API, Auth } from "aws-amplify";

export default async function updateCognitoUser(
  username: string,
  familyName: string,
  givenName: string,
  mailAddress: string
) {
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: (await Auth.currentSession())
        .getAccessToken()
        .getJwtToken(),
    },
    body: {
      username,
      userAttributes: [
        { Name: "family_name", Value: familyName },
        { Name: "given_name", Value: givenName },
        { Name: "email", Value: mailAddress },
      ],
    },
  };

  await API.post("AdminQueries", "/updateUser", params).catch((e) => {
    throw e;
  });
}
