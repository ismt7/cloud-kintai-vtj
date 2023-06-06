import { ThemeProvider } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Provider } from "react-redux";

import { store } from "../../app/store";
import { theme } from "../../lib/theme";

import TimeRecorderRemarks from "./TimeRecorderRemarks";

export default {
  title: "Component/TimeRecorder/TimeRecorderRemarks",
  component: TimeRecorderRemarks,
  decorators: [
    (story) => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{story()}</ThemeProvider>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof TimeRecorderRemarks>;

const Template: ComponentStory<typeof TimeRecorderRemarks> = (args) => (
  <TimeRecorderRemarks {...args} />
);

export const Default = Template.bind({});
Default.args = {
  staffId: 1,
};
