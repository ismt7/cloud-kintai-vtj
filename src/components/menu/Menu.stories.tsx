import { ThemeProvider } from "@mui/material";

import { theme } from "../../lib/theme";

import Menu from "./Menu";

export default {
  component: Menu,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  render: () => (
    <ThemeProvider theme={theme}>
      <Menu />
    </ThemeProvider>
  ),
};

export const Default = {
  storyName: "デフォルト",
  args: {},
};
