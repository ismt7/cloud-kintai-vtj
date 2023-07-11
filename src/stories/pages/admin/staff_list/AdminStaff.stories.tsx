import { MemoryRouter } from "react-router-dom";

import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import { getStaffList200 } from "../../../../components/time_recorder/mocks/ApiMocks";

import AdminStaff from "./AdminStaff";
import GetStoreMock from "./ReducerMock";

const meta: Meta<typeof AdminStaff> = {
  component: AdminStaff,
  parameters: {
    msw: {
      handlers: [getStaffList200()],
    },
  },
  render: () => (
    <Provider store={GetStoreMock()}>
      <MemoryRouter>
        <AdminStaff />
      </MemoryRouter>
    </Provider>
  ),
};

export default meta;
type Story = StoryObj<typeof AdminStaff>;

export const Default: Story = {
  name: "デフォルト",
};
