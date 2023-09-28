import type { Meta, StoryObj } from "@storybook/react";
import AttendanceList from "./AttendanceList";
import { GetAttendanceList, GetLoginStaff, GetRestList } from "./mocks/ApiMock";

const COGNITO_USER_ID_MOCK = "99999999-9999-9999-9999-999999999999";

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
  render: () => <AttendanceList cognitoUserId={COGNITO_USER_ID_MOCK} />,
};

export default meta;
type Story = StoryObj<typeof AttendanceList>;

export const Default: Story = {};
