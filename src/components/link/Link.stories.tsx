import { ComponentMeta, ComponentStory } from "@storybook/react";
import Link from "./Link";

export default {
  title: "Component/Link",
  component: Link,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = () => <Link />;

export const Default = Template.bind({});
Default.storyName = "デフォルト";
Default.args = {
  label: "リンク",
};
