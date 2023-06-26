import React from "react";

import { ThemeProvider } from "@mui/material";

import { theme } from "../../lib/theme";

import Button from "./Button";

import type { ButtonProps } from "./Button";

export default {
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  render: (args: ButtonProps) => (
    <ThemeProvider theme={theme}>
      <Button {...args} />
    </ThemeProvider>
  ),
};

export const Save = {
  storyName: "保存",
  args: { color: "primary", label: "保存" }
};

export const Cancel = {
  storyName: "キャンセル",
  args: { color: "cancel", label: "キャンセル" },
};

export const Disabled = {
  args: {
    disabled: true,
  }
};

export const ClockIn = {
  storyName: "勤務開始",
  args: {
    variant: "outlined",
    color: "clock_in",
    size: "large",
    label: "勤務開始",
  }
};

export const ClockOut = {
  storyName: "勤務終了",
  args: {
    variant: "outlined",
    color: "clock_out",
    size: "large",
    label: "勤務終了",
  }
};

export const RestStart = {
  stroyName: "休憩開始",
  args: {
    variant: "text",
    color: "rest",
    size: "large",
    label: "休憩開始",
  }
};

export const RestEnd = {
  storyName: "休憩終了",
  args: {
    variant: "text",
    color: "rest",
    size: "large",
    label: "休憩終了",
  }
};

export const GoDirectly = {
  storyName: "直行",
  args: {
    variant: "text",
    color: "clock_in",
    size: "large",
    label: "直行",
  }
};

export const ReturnDirectly = {
  storyName: "直帰",
  args: {
    variant: "text",
    color: "clock_out",
    size: "large",
    label: "直帰",
  }
};

export const Login = {
  storyName: "ログイン",
  args: {
    color: "login",
    variant: "outlined",
    label: "ログイン",
    width: "108px",
    height: "42.5px",
  }
};

export const Logout = {
  storyName: "ログアウト",
  args: {
    color: "logout",
    variant: "contained",
    label: "ログアウト"
  }
};

export const EditSmall = {
  storyName: "編集(一覧用)",
  args: {
    color: "primary",
    size: "small",
    label: "編集"
  }
};
