import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import AttendanceList from "../../../components/attendance_list/AttendanceList";

import GetStoreMock from "../../../components/attendance_list/mocks/MockReducer";

describe("AttendanceList Component(", () => {
  test.concurrent("出勤一覧", () => {
    const { asFragment } = render(
      <Provider store={GetStoreMock()}>
        <AttendanceList />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
