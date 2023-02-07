import { ComponentMeta, ComponentStory } from "@storybook/react";
import Clock from "./Clock";

export default {
  title: "Component/Clock",
  component: Clock,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Clock>;

const Template: ComponentStory<typeof Clock> = () => <Clock />;

export const Default = Template.bind({});
Default.args = {};
