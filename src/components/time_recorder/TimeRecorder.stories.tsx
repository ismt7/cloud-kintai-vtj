import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { expect } from "@storybook/jest";
import { waitFor, userEvent, screen } from "@storybook/testing-library";
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
import { theme } from "../../lib/theme";

import TimeRecorder from "./TimeRecorder";
import { testTimeRecorderSlice, TimeRecorderStatus } from "./TimeRecorderSlice";
import { WorkStatusCodes, WorkStatusTexts } from "./WorkStatusCodes";
import {
  getAttendancesHandler200,
  getRestHandler200,
  getStaffHandler200,
  patchAttendancesClockOutHandler200,
  patchRemarksHandler200,
  patchRestEndHandler200,
  postAttendancesClockInHandler200,
  postRestStartHandler200,
} from "./mocks";

const mockStore = configureStore({
  reducer: {
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
    timeRecorderReducer: testTimeRecorderSlice({
      status: TimeRecorderStatus.NOT_PROCESSING,
      workStatus: {
        code: WorkStatusCodes.PROCESSING,
        text: WorkStatusTexts.PROCESSING,
      },
      data: {
        attendance: null,
        rest: null,
      },
    }),
  },
});

export default {
  component: TimeRecorder,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export const Default = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        getAttendancesHandler200(),
        getRestHandler200(),
        postAttendancesClockInHandler200(),
        patchAttendancesClockOutHandler200(),
        getStaffHandler200(),
        postRestStartHandler200(),
        patchRestEndHandler200(),
        patchRemarksHandler200(),
      ],
    },
  },
  render: () => (
    <Provider store={mockStore}>
      <ThemeProvider theme={theme}>
        <TimeRecorder />
      </ThemeProvider>
    </Provider>
  ),
  play: async () => {
    // 出勤前状態で「勤務開始」ボタンのみが有効化されていることを確認
    await waitFor(async () => {
      expect(screen.getByText(/勤務開始/i)).toBeEnabled();
      expect(screen.getByText(/休憩開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩終了/i)).toBeDisabled();
      expect(screen.getByText(/勤務終了/i)).toBeDisabled();
      expect(screen.getByText(/直行/i)).toBeEnabled();
      expect(screen.getByText(/直帰/i)).toBeDisabled();

      const startButton = screen.getByRole("button", { name: /勤務開始/i });
      void userEvent.click(startButton);
    });

    // 出勤後状態で「休憩開始」「勤務終了」「直帰」ボタンのみが有効化されていることを確認
    await waitFor(() => {
      expect(screen.getByText(/勤務開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩開始/i)).toBeEnabled();
      expect(screen.getByText(/休憩終了/i)).toBeDisabled();
      expect(screen.getByText(/勤務終了/i)).toBeEnabled();
      expect(screen.getByText(/直行/i)).toBeDisabled();
      expect(screen.getByText(/直帰/i)).toBeEnabled();

      const restStartButton = screen.getByRole("button", { name: /休憩開始/i });
      void userEvent.click(restStartButton);
    });

    // 休憩中状態で「休憩終了」ボタンのみが有効化されていることを確認
    await waitFor(() => {
      expect(screen.getByText(/勤務開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩終了/i)).toBeEnabled();
      expect(screen.getByText(/勤務終了/i)).toBeDisabled();
      expect(screen.getByText(/直行/i)).toBeDisabled();
      expect(screen.getByText(/直帰/i)).toBeDisabled();

      const restEndButton = screen.getByRole("button", { name: /休憩終了/i });
      void userEvent.click(restEndButton);
    });

    // 休憩終了後の状態で「勤務終了」「直帰」「休憩開始」ボタンのみが有効化されていることを確認
    await waitFor(() => {
      expect(screen.getByText(/勤務開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩開始/i)).toBeEnabled();
      expect(screen.getByText(/休憩終了/i)).toBeDisabled();
      expect(screen.getByText(/勤務終了/i)).toBeEnabled();
      expect(screen.getByText(/直行/i)).toBeDisabled();
      expect(screen.getByText(/直帰/i)).toBeEnabled();

      const endButton = screen.getByRole("button", { name: /勤務終了/i });
      void userEvent.click(endButton);
    });

    // 勤務終了後の状態ですべてのボタンが無効化されていることを確認
    await waitFor(() => {
      expect(screen.getByText(/勤務開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩終了/i)).toBeDisabled();

      const endButton = screen.getByRole("button", { name: /勤務終了/i });
      expect(endButton).toBeDisabled();

      expect(screen.getByText(/直行/i)).toBeDisabled();
      expect(screen.getByText(/直帰/i)).toBeDisabled();
    });
  },
};
