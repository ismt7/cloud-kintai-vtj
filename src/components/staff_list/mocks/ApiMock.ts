import { rest } from "msw";

import { REACT_APP_BASE_PATH } from "../../time_recorder/mocks/ApiMocks";
import MockStaffList from "../data/StaffList";

export default function GetStaffList200() {
  return rest.get(`${REACT_APP_BASE_PATH}/v1/staffs`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(MockStaffList))
  );
}
