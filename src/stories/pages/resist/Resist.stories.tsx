import { MemoryRouter } from "react-router-dom";

import { Meta, StoryObj } from "@storybook/react";

import {
  getAttendancesHandler200,
  getRestHandler200,
  getStaffHandler200,
  patchAttendancesClockOutHandler200,
  patchRemarksHandler200,
  patchRestEndHandler200,
  postAttendancesClockInHandler200,
  postRestStartHandler200,
} from "../../../components/time_recorder/mocks/ApiMocks";

import Resist from "./Resist";

const meta: Meta<typeof Resist> = {
  component: Resist,
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
    <MemoryRouter>
      <Resist />
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof Resist>;

export const ResistPage: Story = {
  name: "勤怠打刻ページ",
};
