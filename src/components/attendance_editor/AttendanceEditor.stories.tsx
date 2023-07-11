import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AttendanceEditor from "./AttendanceEditor";
import { GetAttendance200, GetRests200, GetStaff200 } from "./mocks/ApiMock";
import GetStoreMock from "./mocks/MockReducer";

const now = dayjs();
const targetWorkDate = now.format("YYYYMMDD");

const meta: Meta<typeof AttendanceEditor> = {
  component: AttendanceEditor,
  parameters: {
    msw: {
      handlers: [GetStaff200(), GetAttendance200(), GetRests200()],
    },
  },
  render: () => (
    <Provider store={GetStoreMock()}>
      <MemoryRouter
        initialEntries={[`/admin/attendances/edit/${targetWorkDate}/999`]}
      >
        <Routes>
          <Route
            path="/admin/attendances/edit/:targetWorkDate/:targetStaffId"
            element={<AttendanceEditor />}
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  ),
};

export default meta;
type Story = StoryObj<typeof AttendanceEditor>;

export const Default: Story = {
  name: "デフォルト",
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
