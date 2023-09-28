import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { getStaffList200 } from "../../../../components/time_recorder/mocks/ApiMocks";

import AdminStaff from "./AdminStaff";

const meta: Meta<typeof AdminStaff> = {
  component: AdminStaff,
  parameters: {
    msw: {
      handlers: [getStaffList200()],
    },
  },
  render: () => (
    <MemoryRouter>
      <AdminStaff />
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof AdminStaff>;

export const Default: Story = {
  name: "デフォルト",
};
