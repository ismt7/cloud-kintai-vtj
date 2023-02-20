import { ThemeProvider } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { theme } from "../../lib/theme";
import Clock from "./Clock";

export default {
  title: "Component/Clock",
  component: Clock,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    (story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>,
  ],
} as ComponentMeta<typeof Clock>;

const Template: ComponentStory<typeof Clock> = () => <Clock />;

export const Default = Template.bind({});
Default.args = {};
