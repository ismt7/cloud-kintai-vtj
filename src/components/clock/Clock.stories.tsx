import { ThemeProvider } from "@mui/material";

import { theme } from "../../lib/theme";

import Clock from "./Clock";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Clock> = {
  component: Clock,
  render: () => (
    <ThemeProvider theme={theme}>
      <Clock />
    </ThemeProvider>
  ),
};

export default meta;
type Story = StoryObj<typeof Clock>;

export const Default: Story = {
  storyName: "デフォルト",
};
