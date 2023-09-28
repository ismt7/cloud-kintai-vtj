import { rest } from "msw";

import MockStaffList from "../data/StaffList";

export default function GetStaffs() {
  return rest.get("/staffs", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(MockStaffList))
  );
}
