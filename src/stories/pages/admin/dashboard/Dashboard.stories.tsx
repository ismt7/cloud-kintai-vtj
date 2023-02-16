import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

export default {
  title: "Page/Dashboard",
  component: Dashboard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = () => <Dashboard />;

export const Default = Template.bind({});
Default.args = {};
