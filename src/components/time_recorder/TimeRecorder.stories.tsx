import { ComponentMeta, ComponentStory } from "@storybook/react";
import { expect } from "@storybook/jest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TimeRecorder from "./TimeRecorder";
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
import {
  testTimeRecordSlice,
  TimeRecordStatus,
  TimeRecordStatusText,
} from "../../lib/reducers/timeRecordSlice";
import {
  StaffStatus,
  testStaffRecordSlice,
} from "../../lib/reducers/staffSlice";
import {
  AttendanceStatus,
  testAttendanceSlice,
} from "../../lib/reducers/attendanceReducer";
import { RestStatus, testRestSlice } from "../../lib/reducers/restReducer";

const mockStore = configureStore({
  reducer: {
    timeRecordReducer: testTimeRecordSlice({
      status: TimeRecordStatus.PROCESSING,
      statusText: TimeRecordStatusText.PROCESSING,
    }),
    staffReducer: testStaffRecordSlice({
      status: StaffStatus.DONE,
      data: {
        staffId: 999,
        lastName: "田中",
        firstName: "太郎",
        mailAddress: "tanaka@example.com",
        iconPath: "",
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
  title: "Component/TimeRecorder",
  component: TimeRecorder,
  decorators: [(story) => <Provider store={mockStore}>{story()}</Provider>],
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
  const wait = async (ms: number | undefined) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });

  const canvas = within(canvasElement);

  await wait(500);

  await waitFor(async () => {
    expect(canvas.getByText(/勤務開始/i)).toBeEnabled();
    expect(canvas.getByText(/休憩開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩終了/i)).toBeDisabled();
    expect(canvas.getByText(/勤務終了/i)).toBeDisabled();
    expect(canvas.getByText(/直行/i)).toBeEnabled();
    expect(canvas.getByText(/直帰/i)).toBeDisabled();

    const startButton = canvas.getByRole("button", { name: /勤務開始/i });
    userEvent.click(startButton);
  });

  await wait(500);

  await waitFor(() => {
    expect(canvas.getByText(/勤務開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩開始/i)).toBeEnabled();
    expect(canvas.getByText(/休憩終了/i)).toBeDisabled();
    expect(canvas.getByText(/勤務終了/i)).toBeEnabled();
    expect(canvas.getByText(/直行/i)).toBeDisabled();
    expect(canvas.getByText(/直帰/i)).toBeEnabled();

    const restStartButton = canvas.getByRole("button", { name: /休憩開始/i });
    userEvent.click(restStartButton);
  });

  await wait(500);

  await waitFor(() => {
    expect(canvas.getByText(/勤務開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩終了/i)).toBeEnabled();
    expect(canvas.getByText(/勤務終了/i)).toBeDisabled();
    expect(canvas.getByText(/直行/i)).toBeDisabled();
    expect(canvas.getByText(/直帰/i)).toBeDisabled();

    const restEndButton = canvas.getByRole("button", { name: /休憩終了/i });
    userEvent.click(restEndButton);
  });

  await wait(500);

  await waitFor(() => {
    expect(canvas.getByText(/勤務開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩開始/i)).toBeEnabled();
    expect(canvas.getByText(/休憩終了/i)).toBeDisabled();
    expect(canvas.getByText(/勤務終了/i)).toBeEnabled();
    expect(canvas.getByText(/直行/i)).toBeDisabled();
    expect(canvas.getByText(/直帰/i)).toBeEnabled();

    const endButton = canvas.getByRole("button", { name: /勤務終了/i });
    userEvent.click(endButton);
  });

  await wait(500);

  await waitFor(() => {
    expect(canvas.getByText(/勤務開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩開始/i)).toBeDisabled();
    expect(canvas.getByText(/休憩終了/i)).toBeDisabled();
    expect(canvas.getByText(/勤務終了/i)).toBeDisabled();
    expect(canvas.getByText(/直行/i)).toBeDisabled();
    expect(canvas.getByText(/直帰/i)).toBeDisabled();
  });

  await wait(500);

  await waitFor(() => {
    expect(canvas.queryByTestId("remarks-save")).toBeNull();
    expect(canvas.queryByTestId("remarks-clear")).toBeNull();
  });

  await wait(500);

  await waitFor(() => {
    const remarksText = within(canvas.getByTestId("remarks-text"));
    void userEvent.type(remarksText.getByRole("textbox"), " text remarks", {
      delay: 100,
    });

    const remarksClear = canvas.getByTestId("remarks-clear");
    expect(remarksClear).toBeEnabled();

    const remarksSave = canvas.getByTestId("remarks-save");
    expect(remarksSave).toBeEnabled();

    userEvent.click(remarksClear);
  });

  await wait(500);

  await waitFor(() => {
    expect(canvas.queryByTestId("remarks-save")).toBeNull();
    expect(canvas.queryByTestId("remarks-clear")).toBeNull();
  });

  await wait(500);

  await waitFor(() => {
    const remarksText = within(canvas.getByTestId("remarks-text"));
    void userEvent.type(remarksText.getByRole("textbox"), " text remarks", {
      delay: 100,
    });

    const remarksClear = canvas.getByTestId("remarks-clear");
    expect(remarksClear).toBeEnabled();

    const remarksSave = canvas.getByTestId("remarks-save");
    expect(remarksSave).toBeEnabled();

    userEvent.click(remarksSave);
  });

  await wait(500);

  await waitFor(() => {
    expect(canvas.queryByTestId("remarks-save")).toBeNull();
    expect(canvas.queryByTestId("remarks-clear")).toBeNull();
  });
};

// export const BeforeWork = Template.bind({});
// BeforeWork.storyName = "勤務前";
// BeforeWork.parameters = {
//   msw: {
//     handlers: [
//       getAttendancesHandler404,
//       getRestHandler404,
//       postAttendancesClockInHandler200,
//       patchAttendancesClockOutHandler200,
//       getStaffHandler200,
//       postRestStartHandler200,
//       patchRestEndHandler200,
//       patchRemarksHandler200,
//     ],
//   },
// };

// export const Working = Template.bind({});
// Working.storyName = "勤務中";
// Working.parameters = {
//   msw: {
//     handlers: [
//       rest.get(
//         `${base_path}/attendances/${mockStaffId}/${today}`,
//         (req, res, ctx) =>
//           res(
//             ctx.status(200),
//             ctx.json({
//               attendance_id: 1,
//               staff_id: mockStaffId,
//               work_date: "2023-01-01",
//               start_time: "09:00:00",
//               end_time: null,
//               go_directly_flag: false,
//               return_directly_flag: false,
//               remarks: "",
//             })
//           )
//       ),
//       getRestHandler404,
//       postAttendancesClockInHandler200,
//       patchAttendancesClockOutHandler200,
//       getStaffHandler200,
//       postRestStartHandler200,
//       patchRestEndHandler200,
//       patchRemarksHandler200,
//     ],
//   },
// };

// export const Resting = Template.bind({});
// Resting.storyName = "休憩中";
// Resting.parameters = {
//   msw: {
//     handlers: [
//       rest.get(
//         `${base_path}/attendances/${mockStaffId}/${today}`,
//         (req, res, ctx) =>
//           res(
//             ctx.status(200),
//             ctx.json({
//               attendance_id: 1,
//               staff_id: mockStaffId,
//               work_date: "2023-01-01",
//               start_time: "09:00:00",
//               end_time: null,
//               go_directly_flag: false,
//               return_directly_flag: false,
//               remarks: "",
//             })
//           )
//       ),
//       rest.get(`${base_path}/rests/${mockStaffId}/${today}`, (req, res, ctx) =>
//         res(
//           ctx.status(200),
//           ctx.json({
//             rest_time_id: 1,
//             staff_id: mockStaffId,
//             work_date: "2023-01-01",
//             start_time: "12:00:00",
//             end_time: null,
//           })
//         )
//       ),
//       postAttendancesClockInHandler200,
//       patchAttendancesClockOutHandler200,
//       getStaffHandler200,
//       postRestStartHandler200,
//       patchRestEndHandler200,
//       patchRemarksHandler200,
//     ],
//   },
// };

// export const LeftWork = Template.bind({});
// LeftWork.storyName = "退勤済み";
// LeftWork.parameters = {
//   msw: {
//     handlers: [
//       rest.get(
//         `${base_path}/attendances/${mockStaffId}/${today}`,
//         (reqa, res, ctx) =>
//           res(
//             ctx.status(200),
//             ctx.json({
//               attendance_id: 1,
//               staff_id: mockStaffId,
//               work_date: "2023-01-01",
//               start_time: "09:00:00",
//               end_time: "18:00:00",
//               go_directly_flag: false,
//               return_directly_flag: false,
//               remarks: "",
//             })
//           )
//       ),
//       rest.get(`${base_path}/rests/${mockStaffId}/${today}`, (req, res, ctx) =>
//         res(
//           ctx.status(200),
//           ctx.json({
//             rest_time_id: 1,
//             staff_id: mockStaffId,
//             work_date: "2023-01-01",
//             start_time: "12:00:00",
//             end_time: "13:00:00",
//           })
//         )
//       ),
//       postAttendancesClockInHandler200,
//       patchAttendancesClockOutHandler200,
//       getStaffHandler200,
//       postRestStartHandler200,
//       patchRestEndHandler200,
//       patchRemarksHandler200,
//     ],
//   },
// };
