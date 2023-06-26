import { ThemeProvider } from "@mui/material";

import { theme } from "../../lib/theme";

import Clock from "./Clock";

export default {
  component: Clock,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  render: () => (
    <ThemeProvider theme={theme}>
      <Clock />
    </ThemeProvider>
  ),
};

export const Default = {
  storyName: "デフォルト",
  args: {},
};
