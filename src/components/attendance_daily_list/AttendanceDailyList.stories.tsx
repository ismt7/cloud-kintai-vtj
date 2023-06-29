import { Meta, StoryObj } from "@storybook/react";

import AttendanceDailyList from "./AttendanceDailyList";

const meta: Meta<typeof AttendanceDailyList> = {
  component: AttendanceDailyList,
};

export default meta;
type Story = StoryObj<typeof AttendanceDailyList>;

export const Default: Story = {};
