import { ThemeProvider } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import { theme } from "../../lib/theme";
import {
  deleteStaffHandler200,
  patchStaffRoleHandler200,
  postStaffHandler200,
  putStaffHandler200,
} from "../time_recorder/mocks/ApiMocks";

import StaffForm from "./StaffForm";
import {
  GetStaffAdminCreateStaffInteraction,
  GetStaffAdminUpdateStaffInteraction,
} from "./interactions/StaffAdmin";
import GetSystemAdminCreateStaffInteraction from "./interactions/SystemAdmin";
import {
  GetStoreMockForStaffAdmin,
  GetStoreMockStaffAdminUpdateStaff,
} from "./mocks/StaffAdminMock";
import {
  GetStoreMockForSystemAdminCreateStaff,
  GetStoreMockForSystemAdminUpdateStaff,
} from "./mocks/SystemAdminMock";

const meta: Meta<typeof StaffForm> = {
  component: StaffForm,
  render: () => <StaffForm />,
  parameters: {
    msw: {
      handlers: [
        putStaffHandler200(),
        patchStaffRoleHandler200(),
        postStaffHandler200(),
        deleteStaffHandler200(),
      ],
    },
  },
  argTypes: {
    signIn: {
      description: "ログインボタンを押したときの処理",
    },
    signOut: {
      description: "ログアウトボタンを押したときの処理",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StaffForm>;

export const SystemAdminCreateStaff: Story = {
  storyName: "スタッフ作成(システム管理者)",
  render: () => (
    <Provider store={GetStoreMockForSystemAdminCreateStaff}>
      <ThemeProvider theme={theme}>
        <StaffForm />
      </ThemeProvider>
    </Provider>
  ),
  play: GetSystemAdminCreateStaffInteraction(),
};

export const SystemAdminUpdateStaff: Story = {
  storyName: "スタッフ更新(システム管理者)",
  render: () => (
    <Provider store={GetStoreMockForSystemAdminUpdateStaff}>
      <ThemeProvider theme={theme}>
        <StaffForm />
      </ThemeProvider>
    </Provider>
  ),
};

export const StaffAdminCreateStaff: Story = {
  storyName: "スタッフ作成(スタッフ管理者)",
  args: {},
  render: () => (
    <Provider store={GetStoreMockForStaffAdmin}>
      <ThemeProvider theme={theme}>
        <StaffForm />
      </ThemeProvider>
    </Provider>
  ),
  play: GetStaffAdminCreateStaffInteraction(),
};

export const StaffAdminUpdateStaff: Story = {
  storyName: "スタッフ更新(スタッフ管理者)",
  args: {},
  render: () => (
    <Provider store={GetStoreMockStaffAdminUpdateStaff}>
      <ThemeProvider theme={theme}>
        <StaffForm />
      </ThemeProvider>
    </Provider>
  ),
  play: GetStaffAdminUpdateStaffInteraction(),
};
