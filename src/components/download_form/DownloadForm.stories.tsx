// cspell:words reduxjs
import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import {
  LoginStaffStatus,
  testLoginStaffReducer,
} from "../../lib/reducers/loginStaffReducer";
import {
  StaffListStatus,
  testStaffListReducer,
} from "../../lib/reducers/staffListReducer";
import { theme } from "../../lib/theme";
import { getStaffList200 } from "../time_recorder/mocks/ApiMocks";

import { Meta, StoryObj } from "@storybook/react";
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
      <ThemeProvider theme={theme}>
        <DownloadForm />
      </ThemeProvider>
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

export const Default: Story = {};
