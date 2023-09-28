// cspell:words reduxjs
import { configureStore } from "@reduxjs/toolkit";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import {
  LoginStaffStatus,
  testLoginStaffReducer,
} from "../../lib/reducers/loginStaffReducer";
import { getStaffList200 } from "../time_recorder/mocks/ApiMocks";

import { LoginStaff } from "../staff_list/StaffList";
import DownloadForm from "./DownloadForm";

const loginStaff: LoginStaff = {
  last_name: "ダミー",
  first_name: "太郎",
  mail_address: "example@example.com",
  icon_path: "",
  id: 1,
  cognito_user_id: "DUMMY_COGNITO_USER_ID",
  created_at: "2023-01-01T00:00:00Z",
  updated_at: null,
  created_by: 1,
  updated_by: null,
};

const mockStore = configureStore({
  reducer: {
    loginStaffReducer: testLoginStaffReducer({
      status: LoginStaffStatus.DONE,
      data: {
        id: 999,
        last_name: "田中",
        first_name: "太郎",
        mail_address: "tanaka@example.com",
        icon_path: "",
        cognito_user_id: "",
        created_at: "",
        created_by: 999,
        updated_at: null,
        updated_by: null,
      },
    }),
  },
});

const meta: Meta<typeof DownloadForm> = {
  component: DownloadForm,
  render: () => (
    <Provider store={mockStore}>
      <DownloadForm loginStaff={loginStaff} />
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
