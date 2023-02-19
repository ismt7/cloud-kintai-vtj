import { ThemeProvider } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { theme } from "../../lib/theme";
import Menu from "./Menu";

export default {
  title: "Component/Menu",
  component: Menu,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    (story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>,
  ],
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = () => <Menu />;

export const Default = Template.bind({});
Default.args = {};
