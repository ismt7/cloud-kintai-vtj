import React from "react";

import { ThemeProvider } from "@mui/material";

import { theme } from "../../lib/theme";

import Button, { ButtonProps } from "./Button";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  render: (args: ButtonProps) => (
    <ThemeProvider theme={theme}>
      <Button {...args} />
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      controls: { exclude: ["style"] },
    },
  },
  argTypes: {
    label: { description: "ボタンのラベル" },
    color: { description: "ボタンの色" },
    variant: { description: "ボタンの種類" },
    disabled: { description: "ボタンの無効化" },
    size: { description: "ボタンのサイズ" },
    width: { description: "ボタンの幅" },
    height: { description: "ボタンの高さ" },
    borderRadius: { description: "ボタンの角丸" },
    onClick: { description: "ボタンのクリック時の処理" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  storyName: "デフォルト",
  args: { label: "ボタン" },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  label="ボタン"
/>`,
      },
    },
  },
};

export const Save: Story = {
  storyName: "保存",
  args: {
    color: "primary",
    label: "保存",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  color="primary"
  label="保存"
/>`,
      },
    },
  },
};

export const Cancel: Story = {
  storyName: "キャンセル",
  args: {
    color: "cancel",
    label: "キャンセル",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  color="cancel"
  label="キャンセル"
/>`,
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  disabled
  label="ボタン"
/>`,
      },
    },
  },
};

export const ClockIn: Story = {
  storyName: "勤務開始",
  args: {
    variant: "outlined",
    color: "clock_in",
    size: "large",
    label: "勤務開始",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  variant="outlined"
  color="clock_in"
  size="large"
  label="勤務開始"
/>`,
      },
    },
  },
};

export const ClockOut: Story = {
  storyName: "勤務終了",
  args: {
    variant: "outlined",
    color: "clock_out",
    size: "large",
    label: "勤務終了",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  variant="outlined"
  color="clock_out"
  size="large"
  label="勤務終了"
/>`,
      },
    },
  },
};

export const RestStart: Story = {
  storyName: "休憩開始",
  args: {
    variant: "text",
    color: "rest",
    size: "large",
    label: "休憩開始",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  variant="text"
  color="rest"
  size="large"
  label="休憩開始"
/>`,
      },
    },
  },
};

export const RestEnd: Story = {
  storyName: "休憩終了",
  args: {
    variant: "text",
    color: "rest",
    size: "large",
    label: "休憩終了",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  variant="text"
  color="rest"
  size="large"
  label="休憩終了"
/>`,
      },
    },
  },
};

export const GoDirectly: Story = {
  storyName: "直行",
  args: {
    variant: "text",
    color: "clock_in",
    size: "large",
    label: "直行",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  variant="text"
  color="clock_in"
  size="large"
  label="直行"
/>`,
      },
    },
  },
};

export const ReturnDirectly: Story = {
  storyName: "直帰",
  args: {
    variant: "text",
    color: "clock_out",
    size: "large",
    label: "直帰",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  variant="text"
  color="clock_out"
  size="large"
  label="直帰"
/>`,
      },
    },
  },
};

export const Login: Story = {
  storyName: "ログイン",
  args: {
    color: "login",
    variant: "outlined",
    label: "ログイン",
    width: "108px",
    height: "42.5px",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  color="login"
  variant="outlined"
  label="ログイン"
  width="108px"
  height="42.5px"
/>`,
      },
    },
  },
};

export const Logout: Story = {
  storyName: "ログアウト",
  args: {
    color: "logout",
    variant: "contained",
    label: "ログアウト",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  color="logout"
  variant="contained"
  label="ログアウト"
/>`,
      },
    },
  },
};

export const EditSmall: Story = {
  storyName: "編集(一覧用)",
  args: {
    color: "primary",
    size: "small",
    label: "編集",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button
  color="primary"
  size="small"
  label="編集"
/>`,
      },
    },
  },
};
