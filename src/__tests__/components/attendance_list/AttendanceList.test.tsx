import { render } from "@testing-library/react";

import AttendanceList from "../../../components/attendance_list/AttendanceList";

describe("AttendanceList Component(", () => {
  test.concurrent("出勤一覧", () => {
    const { asFragment } = render(<AttendanceList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
