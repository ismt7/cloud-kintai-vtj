import { ThemeProvider } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { theme } from "../../../../lib/theme";
import Dashboard from "./Dashboard";

export default {
  title: "Page/Dashboard",
  component: Dashboard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    (story) => (
      <MemoryRouter>
        <ThemeProvider theme={theme}>{story()}</ThemeProvider>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = () => <Dashboard />;

export const Default = Template.bind({});
Default.args = {};
