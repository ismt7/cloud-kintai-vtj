import { MemoryRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import {
  getAttendancesHandler200,
  getRestHandler200,
  getStaffHandler200,
  patchAttendancesClockOutHandler200,
  patchRemarksHandler200,
  patchRestEndHandler200,
  postAttendancesClockInHandler200,
  postRestStartHandler200,
} from "../../../components/time_recorder/mocks";
import { theme } from "../../../lib/theme";

import Resist from "./Resist";

export default {
  title: "Page/Resist",
  component: Resist,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (story) => (
      <MemoryRouter>
          <ThemeProvider theme={theme}>{story()}</ThemeProvider>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Resist>;

const Template: ComponentStory<typeof Resist> = (args) => <Resist {...args} />;

export const ResistPage = Template.bind({});
ResistPage.storyName = "勤怠打刻ページ";
ResistPage.args = {};
ResistPage.parameters = {
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
