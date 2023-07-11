// cspell:words reduxjs
import { configureStore } from "@reduxjs/toolkit";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import {
  LoginStaffStatus,
  testLoginStaffReducer,
} from "../../lib/reducers/loginStaffReducer";
import {
  StaffListStatus,
  testStaffListReducer,
} from "../../lib/reducers/staffListReducer";
import { getStaffList200 } from "../time_recorder/mocks/ApiMocks";

import DownloadForm from "./DownloadForm";

const mockStore = configureStore({
  reducer: {
    loginStaffReducer: testLoginStaffReducer({
      status: LoginStaffStatus.DONE,
      data: {
        staffId: 999,
        lastName: "田中",
        firstName: "太郎",
        mailAddress: "tanaka@example.com",
        iconPath: "",
        staffRoles: {
          roleId: 2,
          staffId: 999,
          role: {
            roleName: "スタッフ",
          },
        },
      },
    }),
    staffListReducer: testStaffListReducer({
      status: StaffListStatus.DONE,
      data: [],
    }),
  },
});

const meta: Meta<typeof DownloadForm> = {
  component: DownloadForm,
  render: () => (
    <Provider store={mockStore}>
      <DownloadForm />
    </Provider>
  ),
  parameters: {
    msw: {
      handlers: [getStaffList200()],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DownloadForm>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<DownloadForm />`,
      },
    },
  },
};
