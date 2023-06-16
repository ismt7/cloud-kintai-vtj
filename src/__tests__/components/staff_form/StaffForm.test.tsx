import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import StaffForm from "../../../components/staff_form/StaffForm";
import { AttendanceStatus, testAttendanceSlice } from "../../../lib/reducers/attendanceReducer";
import { LoginStaffStatus, testLoginStaffReducer } from "../../../lib/reducers/loginStaffReducer";
import { RestStatus, testRestSlice } from "../../../lib/reducers/restReducer";
import { StaffListStatus, testStaffListReducer } from "../../../lib/reducers/staffListReducer";
import { TimeRecordListStatus, testTimeRecordListSlice } from "../../../lib/reducers/timeRecordListReducer";
import { TimeRecordStatus, TimeRecordStatusText, testTimeRecordSlice } from "../../../lib/reducers/timeRecordSlice";
import { theme } from "../../../lib/theme";

const mockStore = configureStore({
  reducer: {
    timeRecordReducer: testTimeRecordSlice({
      status: TimeRecordStatus.PROCESSING,
      statusText: TimeRecordStatusText.PROCESSING,
    }),
    loginStaffReducer: testLoginStaffReducer({
      status: LoginStaffStatus.DONE,
      data: {
        staffId: 999,
        lastName: "田中",
        firstName: "太郎",
        mailAddress: "tanaka@example.com",
        iconPath: "",
        staffRoles: {
          roleId: 2,
          staffId: 999,
          role: {
            roleName: "スタッフ",
          },
        },
      },
    }),
    staffListReducer: testStaffListReducer({
      status: StaffListStatus.PROCESSING,
      data: [],
    }),
    attendanceReducer: testAttendanceSlice({
      status: AttendanceStatus.DONE,
      data: null,
    }),
    restReducer: testRestSlice({
      status: RestStatus.DONE,
      data: null,
    }),
    timeRecordListReducer: testTimeRecordListSlice({
      status: TimeRecordListStatus.DONE,
      data: [],
    }),
  },
});

describe("StaffForm Component(", () => {
  test.concurrent("レイアウト崩れが発生していないか(ビジュアルリグレッション)", () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <ThemeProvider theme={theme}>
          <StaffForm />
        </ThemeProvider>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
