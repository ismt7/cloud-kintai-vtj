import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
  StaffListStatus,
  testStaffListReducer,
} from "../../lib/reducers/staffListReducer";
import {
  testTimeRecordListSlice,
  TimeRecordListStatus,
} from "../../lib/reducers/timeRecordListReducer";
import {
  testTimeRecordSlice,
  TimeRecordStatus,
  TimeRecordStatusText,
} from "../../lib/reducers/timeRecordSlice";
import { theme } from "../../lib/theme";
import { getStaffList200 } from "../time_recorder/mocks";

import StaffList from "./StaffList";

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

export default {
  title: "Component/StaffList",
  component: StaffList,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (story) => (
      <Provider store={mockStore}>
        <ThemeProvider theme={theme}>{story()}</ThemeProvider>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof StaffList>;

const Template: ComponentStory<typeof StaffList> = () => <StaffList />;

export const Default = Template.bind({});
Default.storyName = "デフォルト";
Default.args = {};
Default.parameters = {
  msw: {
    handlers: [getStaffList200()],
  },
};
