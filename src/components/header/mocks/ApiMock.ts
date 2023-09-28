import dayjs from "dayjs";
import { rest } from "msw";

export enum Role {
  Admin = 1,
  StaffAdmin = 2,
  Staff = 3,
}

export function GetCognitoUserId() {
  return rest.get("/staff/cognito/:cognitoUserId", (req, res, ctx) => {
    const { params } = req;
    const cognitoUserId = params.cognitoUserId as string;
    const now = dayjs();

    return res(
      ctx.status(200),
      ctx.json({
        id: 2,
        last_name: "田中",
        first_name: "太郎",
        mail_address: "tanaka@example.com",
        icon_path: "",
        cognito_user_id: cognitoUserId,
        created_at: now.format("YYYY-MM-DDTHH:mm:ssZ"),
        updated_at: null,
        created_by: 1,
        updated_by: null,
      })
    );
  });
}

export function GetStaffRole(roleId: Role = Role.Staff) {
  return rest.get("/staff/role/:staffId", (req, res, ctx) => {
    const { params } = req;
    const staffId = params.staffId as string;
    const now = dayjs();

    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        staff_id: staffId,
        role_id: Number(roleId),
        created_at: now.format("YYYY-MM-DDTHH:mm:ssZ"),
        updated_at: null,
        created_by: 1,
        updated_by: null,
      })
    );
  });
}
