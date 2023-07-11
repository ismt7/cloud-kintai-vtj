import type { Meta, StoryObj } from "@storybook/react";
import Clock from "./Clock";

const meta: Meta<typeof Clock> = {
  component: Clock,
  render: () => <Clock />,
};

export default meta;
type Story = StoryObj<typeof Clock>;

export const Default: Story = {
  name: "デフォルト",
};
