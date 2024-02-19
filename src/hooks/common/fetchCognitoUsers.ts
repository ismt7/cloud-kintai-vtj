/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { API, Auth } from "aws-amplify";
import dayjs from "dayjs";

import { Staff } from "../useStaffs/common";
import { StaffRole } from "../useStaffs/useStaffs";

export default async function fetchCognitoUsers(): Promise<Staff[]> {
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: (await Auth.currentSession())
        .getAccessToken()
        .getJwtToken(),
    },
  };

  const response = await API.get("AdminQueries", "/listUsers", params);

  return Promise.all(
    response.Users.map(async (user: any) => {
      const sub = user.Attributes.find(
        (attr: any) => attr.Name === "sub"
      )?.Value;
      const adminResponse = await API.get(
        "AdminQueries",
        "/listGroupsForUser",
        {
          ...params,
          queryStringParameters: {
            username: sub,
          },
        }
      );

      return {
        sub,
        enabled: user.Enabled,
        status: user.UserStatus,
        givenName: user.Attributes.find(
          (attr: any) => attr.Name === "given_name"
        )?.Value,
        familyName: user.Attributes.find(
          (attr: any) => attr.Name === "family_name"
        )?.Value,
        mailAddress: user.Attributes.find((attr: any) => attr.Name === "email")
          ?.Value,
        owner: (() => {
          const owner = Number(
            user.Attributes.find((attr: any) => attr.Name === "custom:owner")
              ?.Value
          );

          if (Number.isNaN(owner)) {
            return false;
          }

          return Boolean(owner);
        })(),
        roles: adminResponse.Groups.map((group: any) => {
          switch (group.GroupName as string) {
            case "Admin":
              return StaffRole.ADMIN;
            case "StaffAdmin":
              return StaffRole.STAFF_ADMIN;
            case "Staff":
              return StaffRole.STAFF;
            case "Guest":
              return StaffRole.GUEST;
            default:
              return StaffRole.NONE;
          }
        }),
        createdAt: dayjs(user.UserCreateDate as string),
        updatedAt: dayjs(user.UserLastModifiedDate as string),
      };
    })
  );
}
