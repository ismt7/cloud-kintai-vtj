import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { expect } from "@storybook/jest";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { waitFor, within, userEvent } from "@storybook/testing-library";
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
  title: "Component/TimeRecorder",
  component: TimeRecorder,
  decorators: [
    (story) => (
      <Provider store={mockStore}>
        <ThemeProvider theme={theme}>{story()}</ThemeProvider>
      </Provider>
    ),
  ],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof TimeRecorder>;

const Template: ComponentStory<typeof TimeRecorder> = () => <TimeRecorder />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
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
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // 出勤前状態で「勤務開始」ボタンのみが有効化されていることを確認
  await waitFor(async () => {
    expect(canvas.getByText(/勤務開始/i)).toBeEnabled();
    expect(canvas.getByText(/休憩開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩終了/i)).toBeDisabled();
    expect(canvas.getByText(/勤務終了/i)).toBeDisabled();
    expect(canvas.getByText(/直行/i)).toBeEnabled();
    expect(canvas.getByText(/直帰/i)).toBeDisabled();

    const startButton = canvas.getByRole("button", { name: /勤務開始/i });
    void userEvent.click(startButton);
  });

  // 出勤後状態で「休憩開始」「勤務終了」「直帰」ボタンのみが有効化されていることを確認
  await waitFor(() => {
    expect(canvas.getByText(/勤務開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩開始/i)).toBeEnabled();
    expect(canvas.getByText(/休憩終了/i)).toBeDisabled();
    expect(canvas.getByText(/勤務終了/i)).toBeEnabled();
    expect(canvas.getByText(/直行/i)).toBeDisabled();
    expect(canvas.getByText(/直帰/i)).toBeEnabled();

    const restStartButton = canvas.getByRole("button", { name: /休憩開始/i });
    void userEvent.click(restStartButton);
  });

  // 休憩中状態で「休憩終了」ボタンのみが有効化されていることを確認
  await waitFor(() => {
    expect(canvas.getByText(/勤務開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩終了/i)).toBeEnabled();
    expect(canvas.getByText(/勤務終了/i)).toBeDisabled();
    expect(canvas.getByText(/直行/i)).toBeDisabled();
    expect(canvas.getByText(/直帰/i)).toBeDisabled();

    const restEndButton = canvas.getByRole("button", { name: /休憩終了/i });
    void userEvent.click(restEndButton);
  });

  // 休憩終了後の状態で「勤務終了」「直帰」「休憩開始」ボタンのみが有効化されていることを確認
  await waitFor(() => {
    expect(canvas.getByText(/勤務開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩開始/i)).toBeEnabled();
    expect(canvas.getByText(/休憩終了/i)).toBeDisabled();
    expect(canvas.getByText(/勤務終了/i)).toBeEnabled();
    expect(canvas.getByText(/直行/i)).toBeDisabled();
    expect(canvas.getByText(/直帰/i)).toBeEnabled();

    const endButton = canvas.getByRole("button", { name: /勤務終了/i });
    void userEvent.click(endButton);
  });

  // 勤務終了後の状態ですべてのボタンが無効化されていることを確認
  await waitFor(() => {
    expect(canvas.getByText(/勤務開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩終了/i)).toBeDisabled();

    const endButton = canvas.getByRole("button", { name: /勤務終了/i });
    expect(endButton).toBeDisabled();

    expect(canvas.getByText(/直行/i)).toBeDisabled();
    expect(canvas.getByText(/直帰/i)).toBeDisabled();
  });
};
