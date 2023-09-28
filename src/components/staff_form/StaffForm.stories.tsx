import { Meta, StoryObj } from "@storybook/react";

import {
  deleteStaffHandler200,
  patchStaffRoleHandler200,
  postStaffHandler200,
  putStaffHandler200,
} from "../time_recorder/mocks/ApiMocks";

import { LoginStaff } from "../staff_list/StaffList";
import {
  GetStaffAdminCreateStaffInteraction,
  GetStaffAdminUpdateStaffInteraction,
} from "./interactions/StaffAdmin";
import GetSystemAdminCreateStaffInteraction from "./interactions/SystemAdmin";
import StaffForm from "./StaffForm";

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

const meta: Meta<typeof StaffForm> = {
  component: StaffForm,
  render: () => <StaffForm loginStaff={loginStaff} />,
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
};

export default meta;
type Story = StoryObj<typeof StaffForm>;

export const SystemAdminCreateStaff: Story = {
  name: "スタッフ作成(システム管理者)",
  render: () => <StaffForm loginStaff={loginStaff} />,
  play: GetSystemAdminCreateStaffInteraction(),
};

export const SystemAdminUpdateStaff: Story = {
  name: "スタッフ更新(システム管理者)",
  render: () => <StaffForm loginStaff={loginStaff} />,
};

export const StaffAdminCreateStaff: Story = {
  name: "スタッフ作成(スタッフ管理者)",
  args: {},
  render: () => <StaffForm loginStaff={loginStaff} />,
  play: GetStaffAdminCreateStaffInteraction(),
};

export const StaffAdminUpdateStaff: Story = {
  name: "スタッフ更新(スタッフ管理者)",
  args: {},
  render: () => <StaffForm loginStaff={loginStaff} />,
  play: GetStaffAdminUpdateStaffInteraction(),
};
