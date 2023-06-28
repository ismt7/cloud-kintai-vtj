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
  TimeRecordListStatus,
  testTimeRecordListSlice,
} from "../../lib/reducers/timeRecordListReducer";
import {
  TimeRecordStatus,
  TimeRecordStatusText,
  testTimeRecordSlice,
} from "../../lib/reducers/timeRecordSlice";
import { theme } from "../../lib/theme";

import { GetAttendanceList, GetRestList } from "./ApiMock";
import AttendanceList from "./AttendanceList";

import type { Meta, StoryObj } from "@storybook/react";

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
    timeRecordListReducer: testTimeRecordListSlice({
      status: TimeRecordListStatus.PROCESSING,
      data: [],
    }),
  },
});

const meta: Meta<typeof AttendanceList> = {
  component: AttendanceList,
  parameters: {
    msw: {
      handlers: [GetAttendanceList(), GetRestList()],
    },
  },
  render: () => (
    <Provider store={mockStore}>
      <ThemeProvider theme={theme}>
        <AttendanceList />
      </ThemeProvider>
    </Provider>
  ),
};

export default meta;
type Story = StoryObj<typeof AttendanceList>;

export const Default: Story = {};

export const NoData: Story = {};
