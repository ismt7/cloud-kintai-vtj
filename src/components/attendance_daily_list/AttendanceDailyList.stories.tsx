import { Meta, StoryObj } from "@storybook/react";

import dayjs from "dayjs";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AttendanceDailyList from "./AttendanceDailyList";
import {
  getAttendancesHandler200,
  getRestsHandler200,
  getStaffsHandler200,
} from "./mocks/MockApi";

const now = dayjs();
const targetWorkDate = now.format("YYYYMMDD");

const meta: Meta<typeof AttendanceDailyList> = {
  component: AttendanceDailyList,
  parameters: {
    msw: {
      handlers: [
        getStaffsHandler200(),
        getAttendancesHandler200(),
        getRestsHandler200(),
      ],
    },
  },
  render: () => (
    <MemoryRouter
      initialEntries={Array.from({ length: 10 }, (_, i) => i).map(
        (i) => `/admin/attendances/edit/${targetWorkDate}/99${i}`
      )}
    >
      <Routes>
        <Route
          path="/admin/attendances/edit/:targetWorkDate/:targetStaffId"
          element={<AttendanceDailyList />}
        />
      </Routes>
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof AttendanceDailyList>;

export const Default: Story = {};

export const DefaultWithNoRest: Story = {
  parameters: {
    msw: {
      handlers: [
        getStaffsHandler200(),
        getAttendancesHandler200(),
        getRestsHandler200(true),
      ],
    },
  },
};

export const DefaultWithNoAttendance: Story = {
  parameters: {
    msw: {
      handlers: [
        getStaffsHandler200(),
        getAttendancesHandler200(true),
        getRestsHandler200(),
      ],
    },
  },
};

export const DefaultWithNoAttendanceAndNoRest: Story = {
  parameters: {
    msw: {
      handlers: [
        getStaffsHandler200(true),
        getAttendancesHandler200(true),
        getRestsHandler200(true),
      ],
    },
  },
};
