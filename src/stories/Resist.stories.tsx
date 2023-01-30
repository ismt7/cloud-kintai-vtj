import { ComponentMeta, ComponentStory } from "@storybook/react";
import Resist from "./Resist";

export default {
  title: "Page/Resist",
  component: Resist,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Resist>;

const Template: ComponentStory<typeof Resist> = (args) => <Resist {...args} />;

export const ResistPage = Template.bind({});
ResistPage.storyName = "勤怠打刻ページ";
ResistPage.args = {};
