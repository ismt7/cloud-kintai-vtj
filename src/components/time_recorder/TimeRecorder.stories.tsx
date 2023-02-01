import { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import TimeRecorder from "./TimeRecorder";
import { TimeRecordState, TimeRecordStatus } from "../../lib/timeRecordSlice";

const MockedState: TimeRecordState = {
  workStart: null,
  workEnd: null,
  goDirect: false,
  returnDirect: false,
  status: TimeRecordStatus.BEFORE_WORK,
  rests: [],
};

const MockStore = ({
  initialState,
  children,
}: {
  initialState: TimeRecordState;
  children: React.ReactNode;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        timeRecordReducer: createSlice({
          name: "timeRecord",
          initialState,
          reducers: {
            clockIn: (state) => {
              // 出勤済みの場合はエラー
              if (state.workStart !== null) {
                state.status = TimeRecordStatus.ERROR;
                return;
              }
              state.workStart = new Date();
              state.status = TimeRecordStatus.WORKING;
            },
            clockOut: (state) => {
              // 出勤打刻なしの場合はエラー
              // 退勤済みの場合はエラー
              if (state.workStart === null || state.workEnd !== null) {
                state.status = TimeRecordStatus.ERROR;
                return;
              }

              // 休憩中の場合はエラー
              if (state.rests.length > 0) {
                const lastRest = state.rests[state.rests.length - 1];
                if (lastRest.end === null) {
                  state.status = TimeRecordStatus.ERROR;
                  return;
                }
              }

              state.workEnd = new Date();
              state.status = TimeRecordStatus.LEFT_WORK;
            },
            startRest: (state) => {
              // 出勤打刻なしの場合はエラー
              // 退勤済みの場合はエラー
              if (state.workStart === null || state.workEnd !== null) {
                state.status = TimeRecordStatus.ERROR;
                return;
              }
              state.rests.push({ start: new Date(), end: null });
              state.status = TimeRecordStatus.RESTING;
            },
            endRest: (state) => {
              const rest = state.rests.pop();
              if (rest === undefined || rest.start === null) {
                state.status = TimeRecordStatus.ERROR;
                return;
              }
              rest.end = new Date();
              state.rests.push(rest);
              state.status = TimeRecordStatus.WORKING;
            },
            goDirect: (state) => {
              // 出勤済みの場合はエラー
              if (state.workStart !== null) {
                state.status = TimeRecordStatus.ERROR;
                return;
              }

              state.workStart = new Date();
              state.goDirect = true;
              state.status = TimeRecordStatus.WORKING;
            },
            returnDirect: (state) => {
              // 出勤打刻なしの場合はエラー
              // 退勤済みの場合はエラー
              if (state.workStart === null || state.workEnd !== null) {
                state.status = TimeRecordStatus.ERROR;
                return;
              }

              state.returnDirect = true;
              state.workEnd = new Date();
              state.status = TimeRecordStatus.LEFT_WORK;
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  title: "Component/TimeRecorder",
  component: TimeRecorder,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof TimeRecorder>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof TimeRecorder> = (args) => <TimeRecorder {...args} />;
const Template: ComponentStory<typeof TimeRecorder> = () => <TimeRecorder />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (story) => <MockStore initialState={MockedState}>{story()}</MockStore>,
];
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  expect(canvas.getByText(/勤務開始/i)).toBeEnabled();
  expect(canvas.getByText(/休憩開始/i)).toBeDisabled();
  expect(canvas.getByText(/休憩終了/i)).toBeDisabled();
  expect(canvas.getByText(/勤務終了/i)).toBeDisabled();
  expect(canvas.getByText(/直行/i)).toBeEnabled();
  expect(canvas.getByText(/直帰/i)).toBeDisabled();

  const startButton = canvas.getByRole("button", { name: /勤務開始/i });
  userEvent.click(startButton);

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
};
