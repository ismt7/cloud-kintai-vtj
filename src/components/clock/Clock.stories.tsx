import Clock from "./Clock";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Clock> = {
  component: Clock,
  render: () => <Clock />,
};

export default meta;
type Story = StoryObj<typeof Clock>;

export const Default: Story = {
  storyName: "デフォルト",
};
