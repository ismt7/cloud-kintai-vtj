import { ThemeProvider } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

import { theme } from "../../lib/theme";

import Link from "./Link";

const meta: Meta<typeof Link> = {
  component: Link,
  render: () => (
    <ThemeProvider theme={theme}>
      <Link label="リンク" />
    </ThemeProvider>
  ),
  argTypes: {
    label: {
      description: "リンクのラベル",
    },
    href: {
      description: "リンク先のURL",
    },
    color: {
      description: "リンクの色",
    },
    sx: {
      description: "リンクのスタイル",
    },
    onClick: {
      description: "リンクのクリック時の処理",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  storyName: "デフォルト",
  args: {
    label: "リンク",
  },
};
