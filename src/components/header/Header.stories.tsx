import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import { GetCognitoUserId, GetStaffRole, Role } from "./mocks/ApiMock";

const COGNITO_USER_ID = "99999999-9999-9999-9999-999999999999";

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [GetCognitoUserId(), GetStaffRole()],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: () => (
    <MemoryRouter>
      <Header
        cognitoUserId={COGNITO_USER_ID}
        signOut={() => {
          /* 処理なし */
        }}
      />
    </MemoryRouter>
  ),
  name: "デフォルト",
};

export const LoggedIn: Story = {
  name: "ログイン",
  args: {},
  render: () => (
    <MemoryRouter>
      <Header
        cognitoUserId={undefined}
        signOut={() => {
          /* 処理なし */
        }}
      />
    </MemoryRouter>
  ),
};

export const StaffAdmin: Story = {
  name: "スタッフ管理者",
  args: {},
  parameters: {
    msw: {
      handlers: [GetCognitoUserId(), GetStaffRole(Role.StaffAdmin)],
    },
  },
  render: () => (
    <MemoryRouter>
      <Header
        cognitoUserId={COGNITO_USER_ID}
        signOut={() => {
          /* 処理なし */
        }}
      />
    </MemoryRouter>
  ),
};

export const Admin: Story = {
  name: "システム管理者",
  args: {},
  parameters: {
    msw: {
      handlers: [GetCognitoUserId(), GetStaffRole(Role.Admin)],
    },
  },
  render: () => (
    <MemoryRouter>
      <Header
        cognitoUserId={COGNITO_USER_ID}
        signOut={() => {
          /* 処理なし */
        }}
      />
    </MemoryRouter>
  ),
};
