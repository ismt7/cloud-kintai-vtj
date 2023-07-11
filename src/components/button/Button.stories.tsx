import type { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonProps } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  render: (args: ButtonProps) => <Button {...args} />,
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
  name: "デフォルト",
  args: { label: "ボタン" },
  parameters: {
    docs: {
      description: {
        story: "汎用的に使用できるボタンです。",
      },
    },
  },
};

export const Save: Story = {
  name: "保存",
  args: {
    color: "primary",
    label: "保存",
  },
  parameters: {
    docs: {
      description: {
        story: "汎用的に使用できる保存ボタンです。",
      },
    },
  },
};

export const Cancel: Story = {
  name: "キャンセル",
  args: {
    color: "cancel",
    label: "キャンセル",
  },
  parameters: {
    docs: {
      description: {
        story: "汎用的に使用できるキャンセルボタンです。",
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
      description: {
        story: "汎用的に使用できる無効化されたボタンです。",
      },
    },
  },
};

export const ClockIn: Story = {
  name: "勤務開始",
  args: {
    variant: "outlined",
    color: "clock_in",
    size: "large",
    label: "勤務開始",
  },
  parameters: {
    docs: {
      description: {
        story: "<TimeRecorder /> で使用する勤務開始ボタンです。",
      },
    },
  },
};

export const ClockOut: Story = {
  name: "勤務終了",
  args: {
    variant: "outlined",
    color: "clock_out",
    size: "large",
    label: "勤務終了",
  },
  parameters: {
    docs: {
      description: {
        story: "<TimeRecorder /> で使用する勤務終了ボタンです。",
      },
    },
  },
};

export const RestStart: Story = {
  name: "休憩開始",
  args: {
    variant: "text",
    color: "rest",
    size: "large",
    label: "休憩開始",
  },
  parameters: {
    docs: {
      description: {
        story: "<TimeRecorder /> で使用する休憩開始ボタンです。",
      },
    },
  },
};

export const RestEnd: Story = {
  name: "休憩終了",
  args: {
    variant: "text",
    color: "rest",
    size: "large",
    label: "休憩終了",
  },
  parameters: {
    docs: {
      description: {
        story: "<TimeRecorder /> で使用する休憩終了ボタンです。",
      },
    },
  },
};

export const GoDirectly: Story = {
  name: "直行",
  args: {
    variant: "text",
    color: "clock_in",
    size: "large",
    label: "直行",
  },
  parameters: {
    docs: {
      description: {
        story: "<TimeRecorder /> で使用する直行ボタンです。",
      },
    },
  },
};

export const ReturnDirectly: Story = {
  name: "直帰",
  args: {
    variant: "text",
    color: "clock_out",
    size: "large",
    label: "直帰",
  },
  parameters: {
    docs: {
      description: {
        story: "<TimeRecorder /> で使用する直帰ボタンです。",
      },
    },
  },
};

export const Login: Story = {
  name: "ログイン",
  args: {
    color: "login",
    variant: "outlined",
    label: "ログイン",
    width: "108px",
    height: "42.5px",
  },
  parameters: {
    docs: {
      description: {
        story: "汎用的に使用できるログインボタンです。",
      },
    },
  },
};

export const Logout: Story = {
  name: "ログアウト",
  args: {
    color: "logout",
    variant: "contained",
    label: "ログアウト",
  },
  parameters: {
    docs: {
      description: {
        story: "汎用的に使用できるログアウトボタンです。",
      },
    },
  },
};

export const EditSmall: Story = {
  name: "編集(一覧用)",
  args: {
    color: "primary",
    size: "small",
    label: "編集",
  },
  parameters: {
    docs: {
      description: {
        story: "一覧用の編集ボタンです。",
      },
    },
  },
};
