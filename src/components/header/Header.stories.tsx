import { MemoryRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import {
  AttendanceStatus,
  testAttendanceSlice,
} from "../../lib/reducers/attendanceReducer";
import {
  LoginStaffStatus,
  testLoginStaffReducer,
} from "../../lib/reducers/loginStaffReducer";
import { RestStatus, testRestSlice } from "../../lib/reducers/restReducer";
import {
  testTimeRecordSlice,
  TimeRecordStatus,
  TimeRecordStatusText,
} from "../../lib/reducers/timeRecordSlice";
import { theme } from "../../lib/theme";

import Header, { HeaderProps } from "./Header";

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

export default {
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: (args: HeaderProps) => (
    <Provider store={mockStore}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header {...args} />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  ),
  storyName: "デフォルト",
  args: {},
};

const loginMockStore = configureStore({
  reducer: {
    timeRecordReducer: testTimeRecordSlice({
      status: TimeRecordStatus.PROCESSING,
      statusText: TimeRecordStatusText.PROCESSING,
    }),
    loginStaffReducer: testLoginStaffReducer({
      status: LoginStaffStatus.DONE,
      data: undefined,
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
export const LoggedIn = {
  storyName: "ログイン",
  args: {},
  render: (args: HeaderProps) => (
    <Provider store={loginMockStore}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header {...args} />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  ),
};

export const LoggedOut = {
  storyName: "ログアウト",
  args: {},
  render: (args: HeaderProps) => (
    <Provider store={mockStore}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header {...args} />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  ),
};

const staffAdminMockStore = configureStore({
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
          roleId: 1,
          staffId: 999,
          role: {
            roleName: "システム管理者",
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
export const StaffAdmin = {
  storyName: "スタッフ管理者",
  args: {},
  render: (args: HeaderProps) => (
    <Provider store={staffAdminMockStore}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header {...args} />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  ),
};

const systemAdminMockStore = configureStore({
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
          roleId: 1,
          staffId: 999,
          role: {
            roleName: "システム管理者",
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

export const Admin = {
  storyName: "システム管理者",
  args: {},
  render: (args: HeaderProps) => (
    <Provider store={systemAdminMockStore}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header {...args} />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  ),
};
