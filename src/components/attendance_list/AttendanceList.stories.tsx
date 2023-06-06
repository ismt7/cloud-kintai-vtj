import { ComponentMeta, ComponentStory } from "@storybook/react";

import AttendanceList from "./AttendanceList";

export default {
  title: "component/AttendanceList",
  component: AttendanceList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AttendanceList>;

const Template: ComponentStory<typeof AttendanceList> = () => (
  <AttendanceList />
);

export const Primary = Template.bind({});
Primary.args = {};
