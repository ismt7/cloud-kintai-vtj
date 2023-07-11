import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import TimeRecorder from "./TimeRecorder";
import GetInteraction from "./interactions/Interaction";
import {
  getAttendancesHandler200,
  getRestHandler200,
  getStaffHandler200,
  patchAttendancesClockOutHandler200,
  patchRemarksHandler200,
  patchRestEndHandler200,
  postAttendancesClockInHandler200,
  postRestStartHandler200,
} from "./mocks/ApiMocks";
import GetStoreMock from "./mocks/MockReducer";

const meta: Meta<typeof TimeRecorder> = {
  component: TimeRecorder,
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
    <Provider store={GetStoreMock()}>
      <TimeRecorder />
    </Provider>
  ),
};

export default meta;
type Story = StoryObj<typeof TimeRecorder>;

export const Default: Story = {
  play: GetInteraction(),
};
