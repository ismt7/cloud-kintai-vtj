import { ThemeProvider } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { theme } from "../../lib/theme";

import Footer from "./Footer";

export default {
  title: "Component/Footer",
  component: Footer,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    (story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>,
  ],
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => <Footer />;

export const Default = Template.bind({});
Default.args = {};
