import { render } from "@testing-library/react";

import AttendanceEditor from "../../../components/attendance_editor/AttendanceEditor";

describe("AttendanceEditor Component(", () => {
  test.concurrent("レイアウト崩れが発生していないか(ビジュアルリグレッション)", () => {
    const { asFragment } = render(<AttendanceEditor />);
    expect(asFragment()).toMatchSnapshot();
  });
});
