import type { Meta, StoryObj } from "@storybook/react";
import AttendanceList from "./AttendanceList";
import { GetAttendanceList, GetLoginStaff, GetRestList } from "./mocks/ApiMock";

const meta: Meta<typeof AttendanceList> = {
  component: AttendanceList,
  parameters: {
    msw: {
      handlers: [GetAttendanceList(), GetRestList(), GetLoginStaff()],
    },
    docs: {
      source: {
        code: "<AttendanceList />",
      },
    },
  },
  render: () => <AttendanceList />,
};

export default meta;
type Story = StoryObj<typeof AttendanceList>;

export const Default: Story = {};
