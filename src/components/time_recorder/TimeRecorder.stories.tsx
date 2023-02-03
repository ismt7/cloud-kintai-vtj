import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Provider } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import TimeRecorder from "./TimeRecorder";
import { store } from "../../lib/store";
// import handlers from "../../mocks/handlers";

export default {
  title: "Component/TimeRecorder",
  component: TimeRecorder,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof TimeRecorder>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TimeRecorder> = () => <TimeRecorder />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        "http://localhost:8000/attendances/999/20230101",
        (req, res, ctx) =>
          // eslint-disable-next-line max-len
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
          res(ctx.status(404))
      ),
    ],
  },
};

Default.args = {};
// Default.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);

//   expect(canvas.getByText(/勤務開始/i)).toBeEnabled();
//   expect(canvas.getByText(/休憩開始/i)).toBeDisabled();
//   expect(canvas.getByText(/休憩終了/i)).toBeDisabled();
//   expect(canvas.getByText(/勤務終了/i)).toBeDisabled();
//   expect(canvas.getByText(/直行/i)).toBeEnabled();
//   expect(canvas.getByText(/直帰/i)).toBeDisabled();

//   const startButton = canvas.getByRole("button", { name: /勤務開始/i });
//   userEvent.click(startButton);

//   await waitFor(() => {
//     expect(canvas.getByText(/勤務開始/i)).toBeDisabled();
//     expect(canvas.getByText(/休憩開始/i)).toBeEnabled();
//     expect(canvas.getByText(/休憩終了/i)).toBeDisabled();
//     expect(canvas.getByText(/勤務終了/i)).toBeEnabled();
//     expect(canvas.getByText(/直行/i)).toBeDisabled();
//     expect(canvas.getByText(/直帰/i)).toBeEnabled();

//     const restStartButton = canvas.getByRole("button", { name: /休憩開始/i });
//     userEvent.click(restStartButton);
//   });

//   await waitFor(() => {
//     expect(canvas.getByText(/勤務開始/i)).toBeDisabled();
//     expect(canvas.getByText(/休憩開始/i)).toBeDisabled();
//     expect(canvas.getByText(/休憩終了/i)).toBeEnabled();
//     expect(canvas.getByText(/勤務終了/i)).toBeDisabled();
//     expect(canvas.getByText(/直行/i)).toBeDisabled();
//     expect(canvas.getByText(/直帰/i)).toBeDisabled();

//     const restEndButton = canvas.getByRole("button", { name: /休憩終了/i });
//     userEvent.click(restEndButton);
//   });

//   await waitFor(() => {
//     expect(canvas.getByText(/勤務開始/i)).toBeDisabled();
//     expect(canvas.getByText(/休憩開始/i)).toBeEnabled();
//     expect(canvas.getByText(/休憩終了/i)).toBeDisabled();
//     expect(canvas.getByText(/勤務終了/i)).toBeEnabled();
//     expect(canvas.getByText(/直行/i)).toBeDisabled();
//     expect(canvas.getByText(/直帰/i)).toBeEnabled();

//     const endButton = canvas.getByRole("button", { name: /勤務終了/i });
//     userEvent.click(endButton);
//   });
// };

export const BeforeWork = Template.bind({});
BeforeWork.storyName = "勤務前";
BeforeWork.parameters = {
  msw: {
    handlers: [
      rest.get(
        "http://localhost:8000/attendances/999/20230101",
        (req, res, ctx) =>
          // eslint-disable-next-line max-len
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
          res(ctx.status(404))
      ),
    ],
  },
};

export const Working = Template.bind({});
Working.storyName = "勤務中";
Working.parameters = {
  msw: {
    handlers: [
      rest.get(
        "http://localhost:8000/attendances/999/20230101",
        (req, res, ctx) =>
          // eslint-disable-next-line max-len
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
          res(
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            ctx.status(200),
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            ctx.json({
              attendance_id: 1,
              staff_id: 1,
              work_date: "2023-01-01",
              start_time: "09:00:00",
              end_time: null,
              go_directly_flag: false,
              return_directly_flag: false,
              remarks: "",
            })
          )
      ),
    ],
  },
};

export const Resting = Template.bind({});
Resting.storyName = "休憩中";
Resting.parameters = {
  msw: {
    handlers: [
      rest.get(
        "http://localhost:8000/attendances/999/20230101",
        (req, res, ctx) =>
          // eslint-disable-next-line max-len
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
          res(
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            ctx.status(200),
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            ctx.json({
              attendance_id: 1,
              staff_id: 1,
              work_date: "2023-01-01",
              start_time: "09:00:00",
              end_time: null,
              go_directly_flag: false,
              return_directly_flag: false,
              remarks: "",
            })
          )
      ),
      rest.get("http://localhost:8000/rests/999/20230101", (req, res, ctx) =>
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        res(
          // eslint-disable-next-line max-len
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          ctx.status(200),
          // eslint-disable-next-line max-len
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          ctx.json({
            rest_time_id: 1,
            staff_id: 1,
            work_date: "2023-01-01",
            start_time: "12:00:00",
            end_time: null,
          })
        )
      ),
    ],
  },
};

export const LeftWork = Template.bind({});
LeftWork.storyName = "退勤済み";
LeftWork.parameters = {
  msw: {
    handlers: [
      rest.get(
        "http://localhost:8000/attendances/999/20230101",
        (req, res, ctx) =>
          // eslint-disable-next-line max-len
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
          res(
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            ctx.status(200),
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            ctx.json({
              attendance_id: 1,
              staff_id: 1,
              work_date: "2023-01-01",
              start_time: "09:00:00",
              end_time: "18:00:00",
              go_directly_flag: false,
              return_directly_flag: false,
              remarks: "",
            })
          )
      ),
      rest.get("http://localhost:8000/rests/999/20230101", (req, res, ctx) =>
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        res(
          // eslint-disable-next-line max-len
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          ctx.status(200),
          // eslint-disable-next-line max-len
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          ctx.json({
            rest_time_id: 1,
            staff_id: 1,
            work_date: "2023-01-01",
            start_time: "12:00:00",
            end_time: "13:00:00",
          })
        )
      ),
    ],
  },
};
