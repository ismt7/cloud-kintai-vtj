import { ComponentMeta, ComponentStory } from "@storybook/react";
import Menu from "./Menu";

export default {
  title: "Component/Menu",
  component: Menu,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = () => <Menu />;

export const Default = Template.bind({});
Default.args = {};
