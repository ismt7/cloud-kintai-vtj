import { ComponentStory, ComponentMeta } from "@storybook/react";

import Header from "./Header";

export default {
  title: "Component/Header",
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
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
  user: {
    lastName: "山田",
    firstName: "太郎",
    mailAddress: "yamada@example.com",
    role: "user",
  },
};

export const Admin = Template.bind({});
Admin.storyName = "管理者";
Admin.args = {
  user: {
    lastName: "田中",
    firstName: "二郎",
    mailAddress: "tanaka@example.com",
    role: "admin",
  },
};
