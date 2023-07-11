import { MemoryRouter } from "react-router-dom";

import { Meta, StoryObj } from "@storybook/react";

import Top from "./Top";

const meta: Meta<typeof Top> = {
  component: Top,
  render: () => (
    <MemoryRouter>
      <Top />
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof Top>;

export const Default: Story = {
  name: "デフォルト",
};

// export const LoggedIn = Template.bind({});

// // More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
// LoggedIn.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   const loginButton = canvas.getByRole("button", { name: /Log in/i });
//   userEvent.click(loginButton);
// };
