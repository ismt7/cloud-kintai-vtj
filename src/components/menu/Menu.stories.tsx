import { ThemeProvider } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

import { theme } from "../../lib/theme";

import Menu from "./Menu";

const meta: Meta<typeof Menu> = {
  component: Menu,
  render: () => (
    <ThemeProvider theme={theme}>
      <Menu />
    </ThemeProvider>
  ),
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  storyName: "デフォルト",
};
