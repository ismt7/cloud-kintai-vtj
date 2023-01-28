import { ComponentMeta, ComponentStory } from "@storybook/react";
import Clock from "./Clock";

export default {
  title: "Example/Clock",
  component: Clock,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Clock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof Clock> = (args) => <Clock {...args} />;
const Template: ComponentStory<typeof Clock> = () => <Clock />;

export const Default = Template.bind({});
Default.args = {};
