import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { StaffStatus } from "../../lib/reducers/staffSlice";

import Header from "./Header";

export default {
  title: "Component/Header",
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Header>;

// const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;
const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.storyName = "デフォルト";
Default.args = {};

export const LoggedIn = Template.bind({});
LoggedIn.storyName = "ログイン";
LoggedIn.args = {};

export const LoggedOut = Template.bind({});
LoggedOut.storyName = "ログアウト";
LoggedOut.args = {
  staff: {
    status: StaffStatus.DONE,
    data: {
      lastName: "田中",
      firstName: "二郎",
      mailAddress: "tanaka@example.com",
      staffId: 1,
      // role: "staff",
    },
  },
};

export const Admin = Template.bind({});
Admin.storyName = "管理者";
Admin.args = {
  staff: {
    status: StaffStatus.DONE,
    data: {
      lastName: "田中",
      firstName: "二郎",
      mailAddress: "tanaka@example.com",
      staffId: 1,
      // role: "admin",
    },
  },
};
