import { MemoryRouter } from "react-router-dom";

import { Meta, StoryObj } from "@storybook/react";

import Dashboard from "./Dashboard";

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
  render: () => (
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {};
