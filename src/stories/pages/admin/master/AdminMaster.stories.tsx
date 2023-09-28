import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { getStaffList200 } from "../../../../components/time_recorder/mocks/ApiMocks";
import AdminMaster from "./AdminMaster";

const meta: Meta<typeof AdminMaster> = {
  component: AdminMaster,
  parameters: {
    msw: {
      handlers: [getStaffList200()],
    },
  },
  render: () => (
    <MemoryRouter>
      <AdminMaster />
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof AdminMaster>;

export const Default: Story = {
  name: "デフォルト",
};
