import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { expect } from "@storybook/jest";
import { userEvent, waitFor, screen } from "@storybook/testing-library";
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
  component: StaffList,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: () => (
    <Provider store={mockStore}>
      <ThemeProvider theme={theme}>
        <StaffList />
      </ThemeProvider>
    </Provider>
  ),
  storyName: "デフォルト",
  args: {},
  parameters: {
    msw: {
      handlers: [getStaffList200()],
    },
  },
  play: async () => {
    const sleep = async (ms: number | undefined) => new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });

    const searchInput = screen.getByRole("textbox");
    void userEvent.type(searchInput, "田中");

    await sleep(1000);

    await waitFor(() => {
      const searchButton = screen.getByTestId("SearchIcon");
      void userEvent.click(searchButton);
    });

    await waitFor(() => {
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(list).toHaveTextContent("田中 太郎");
      expect(list).not.toHaveTextContent("山田 花子");
    });
  }
};
