import { MemoryRouter, Route, Routes } from "react-router-dom";

import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import dayjs from "dayjs";
import { getWorkPeriodPerMonthHandler200 } from "../time_recorder/mocks/ApiMocks";

import JobTerm from "./JobTerm";
import GetStoreMock from "./StoreMock";

const meta: Meta<typeof JobTerm> = {
  component: JobTerm,
  parameters: {
    msw: {
      handlers: [getWorkPeriodPerMonthHandler200()],
    },
  },
  render: () => {
    const now = dayjs();
    const beforeYear = now.year() - 1;
    const targetYear = now.year();
    const afterYear = now.year() + 1;

    return (
      <Provider store={GetStoreMock()}>
        <MemoryRouter
          initialEntries={[
            `/admin/job_term/${beforeYear}`,
            `/admin/job_term/${targetYear}`,
            `/admin/job_term/${afterYear}`,
          ]}
          initialIndex={1}
        >
          <Routes>
            <Route path="/admin/job_term/:targetYear" element={<JobTerm />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  },
};

export default meta;
type Story = StoryObj<typeof JobTerm>;

export const Default: Story = {};
