import { ThemeProvider } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

import { theme } from "../../lib/theme";

import Footer from "./Footer";

const meta: Meta<typeof Footer> = {
  component: Footer,
  render: () => (
    <ThemeProvider theme={theme}>
      <Footer />
    </ThemeProvider>
  ),
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
