import { ThemeProvider } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { theme } from "../../lib/theme";
import Link from "./Link";

export default {
  title: "Component/Link",
  component: Link,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    (story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>,
  ],
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = () => <Link />;

export const Default = Template.bind({});
Default.storyName = "デフォルト";
Default.args = {
  label: "リンク",
};
