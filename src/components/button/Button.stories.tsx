import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Save = Template.bind({});
Save.storyName = "保存";
Save.args = {
  color: "primary",
  label: "保存",
};

export const Cancel = Template.bind({});
Cancel.storyName = "キャンセル";
Cancel.args = {
  color: "cancel",
  label: "キャンセル",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const ClockIn = Template.bind({});
ClockIn.storyName = "勤務開始";
ClockIn.args = {
  variant: "outlined",
  color: "clock_in",
  size: "large",
  label: "勤務開始",
};

export const ClockOut = Template.bind({});
ClockOut.storyName = "勤務終了";
ClockOut.args = {
  variant: "outlined",
  color: "clock_out",
  size: "large",
  label: "勤務終了",
};

export const RestStart = Template.bind({});
RestStart.storyName = "休憩開始";
RestStart.args = {
  variant: "text",
  color: "rest",
  size: "large",
  label: "休憩開始",
};

export const RestEnd = Template.bind({});
RestEnd.storyName = "休憩終了";
RestEnd.args = {
  variant: "text",
  color: "rest",
  size: "large",
  label: "休憩終了",
};

export const GoDirectly = Template.bind({});
GoDirectly.storyName = "直行";
GoDirectly.args = {
  variant: "text",
  color: "clock_in",
  size: "large",
  label: "直行",
};

export const ReturnDirectly = Template.bind({});
ReturnDirectly.storyName = "直帰";
ReturnDirectly.args = {
  variant: "text",
  color: "clock_out",
  size: "large",
  label: "直帰",
};

export const Login = Template.bind({});
Login.storyName = "ログイン";
Login.args = {
  color: "login",
  variant: "outlined",
  label: "ログイン",
  width: "108px",
  height: "42.5px",
};

export const Logout = Template.bind({});
Logout.storyName = "ログアウト";
Logout.args = {
  color: "logout",
  variant: "contained",
  label: "ログアウト",
};

export const EditSmall = Template.bind({});
EditSmall.storyName = "編集(一覧用)";
EditSmall.args = {
  color: "primary",
  size: "small",
  label: "編集",
};
