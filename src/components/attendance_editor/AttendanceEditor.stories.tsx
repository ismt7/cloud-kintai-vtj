import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import AttendanceEditor from "./AttendanceEditor";
import { GetAttendance200, GetRests200, GetStaff200 } from "./mocks/ApiMock";
import GetStoreMock from "./mocks/MockReducer";

const meta: Meta<typeof AttendanceEditor> = {
  component: AttendanceEditor,
  parameters: {
    msw: {
      handlers: [GetStaff200(), GetAttendance200(), GetRests200()],
    },
  },
  render: () => (
    <Provider store={GetStoreMock()}>
      <AttendanceEditor />
    </Provider>
  ),
};

export default meta;
type Story = StoryObj<typeof AttendanceEditor>;

export const Default: Story = {
  storyName: "デフォルト",
  parameters: {
    docs: {
      description: {
        story: "勤怠編集画面です。",
      },
      source: {
        code: "<AttendanceEditor />",
        type: "auto",
      },
    },
  },
};
