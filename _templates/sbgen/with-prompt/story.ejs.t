---
to: src/components/<%= h.changeCase.snake(name); %>/<%= h.changeCase.pascal(name); %>.stories.tsx
---
<%
ComponentName = h.changeCase.pascal(name);
DirectoryName = h.changeCase.snake(name);
-%>
import <%= ComponentName %> from "./<%= ComponentName %>";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof <%= ComponentName %>> = {
  component: <%= ComponentName %>,
  render: () => <<%= ComponentName %> />,
};

export default meta;
type Story = StoryObj<typeof <%= ComponentName %>>;

export const Default: Story = {
  storyName: "デフォルト",
  parameters: {
    docs: {
      description: {
        story: "{{ここにストーリーの説明を記載することができます}}",
      },
      source: {
        code: "<%= ComponentName %>",
        type: "auto",
      },
    },
  },
};
