import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { getStaffList200 } from "../../../../components/time_recorder/mocks/ApiMocks";
import GetStoreMock from "../staff_list/ReducerMock";
import AdminMaster from "./AdminMaster";

const meta: Meta<typeof AdminMaster> = {
  component: AdminMaster,
  parameters: {
    msw: {
      handlers: [getStaffList200()],
    },
  },
  render: () => (
    <Provider store={GetStoreMock()}>
      <MemoryRouter>
        <AdminMaster />
      </MemoryRouter>
    </Provider>
  ),
};

export default meta;
type Story = StoryObj<typeof AdminMaster>;

export const Default: Story = {
  name: "デフォルト",
};
