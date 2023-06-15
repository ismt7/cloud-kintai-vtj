import { MemoryRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import Header from "../../../components/header/Header";
import {
  AttendanceStatus,
  testAttendanceSlice,
} from "../../../lib/reducers/attendanceReducer";
import {
  LoginStaffStatus,
  testLoginStaffReducer,
} from "../../../lib/reducers/loginStaffReducer";
import { RestStatus, testRestSlice } from "../../../lib/reducers/restReducer";
import {
  testTimeRecordSlice,
  TimeRecordStatus,
  TimeRecordStatusText,
} from "../../../lib/reducers/timeRecordSlice";
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
          roleId: 3,
          staffId: 999,
          role: {
            roleName: "スタッフ管理者",
          },
        },
      },
    }),
    attendanceReducer: testAttendanceSlice({
      status: AttendanceStatus.DONE,
      data: null,
    }),
    restReducer: testRestSlice({
      status: RestStatus.DONE,
      data: null,
    }),
  },
});

describe("Header Component(", () => {
  test.concurrent("ヘッダー", () => {
    const mockSignIn = jest.fn();
    const mockSignOut = jest.fn();
    const { asFragment } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <Header signIn={mockSignIn} signOut={mockSignOut} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
