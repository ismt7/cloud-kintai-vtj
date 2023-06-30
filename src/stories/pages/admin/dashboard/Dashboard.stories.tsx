import { MemoryRouter } from "react-router-dom";

import { ComponentMeta, ComponentStory } from "@storybook/react";


import Dashboard from "./Dashboard";

export default {
  title: "Page/Admin/Dashboard",
  component: Dashboard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = () => <Dashboard />;

export const Default = Template.bind({});
Default.args = {};
