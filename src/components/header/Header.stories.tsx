import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import {
  AttendanceStatus,
  testAttendanceSlice,
} from "../../lib/reducers/attendanceReducer";
import { RestStatus, testRestSlice } from "../../lib/reducers/restReducer";
import {
  LoginStaffStatus,
  testLoginStaffReducer,
} from "../../lib/reducers/loginStaffReducer";
import {
  testTimeRecordSlice,
  TimeRecordStatus,
  TimeRecordStatusText,
} from "../../lib/reducers/timeRecordSlice";
import { theme } from "../../lib/theme";

import Header from "./Header";

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

export default {
  title: "Component/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (story) => (
      <Provider store={mockStore}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>{story()}</ThemeProvider>
        </MemoryRouter>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.storyName = "デフォルト";
Default.args = {};

export const LoggedIn = Template.bind({});
LoggedIn.storyName = "ログイン";
LoggedIn.args = {};

export const LoggedOut = Template.bind({});
LoggedOut.storyName = "ログアウト";
LoggedOut.args = {};

export const Admin = Template.bind({});
Admin.storyName = "管理者";
Admin.args = {};
