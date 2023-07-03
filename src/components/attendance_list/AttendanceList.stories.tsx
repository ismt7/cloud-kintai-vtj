import { Provider } from "react-redux";

import type { Meta, StoryObj } from "@storybook/react";
import AttendanceList from "./AttendanceList";
import { GetAttendanceList, GetRestList } from "./mocks/ApiMock";
import GetStoreMock from "./mocks/MockReducer";

const meta: Meta<typeof AttendanceList> = {
  component: AttendanceList,
  parameters: {
    msw: {
      handlers: [GetAttendanceList(), GetRestList()],
    },
    docs: {
      source: {
        code: "<AttendanceList />",
      },
    },
  },
  render: () => (
    <Provider store={GetStoreMock()}>
      <AttendanceList />
    </Provider>
  ),
};

export default meta;
type Story = StoryObj<typeof AttendanceList>;

export const Default: Story = {};

export const NoData: Story = {};
