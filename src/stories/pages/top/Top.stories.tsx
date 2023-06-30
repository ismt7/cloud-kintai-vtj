import { MemoryRouter } from "react-router-dom";

import { ComponentStory, ComponentMeta } from "@storybook/react";

// import { within, userEvent } from "@storybook/testing-library";
import Top from "./Top";

export default {
  title: "Page/Top",
  component: Top,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as ComponentMeta<typeof Top>;

const Template: ComponentStory<typeof Top> = (args) => <Top {...args} />;

export const TopPage = Template.bind({});
TopPage.storyName = "トップページ";
TopPage.args = {};

// export const LoggedIn = Template.bind({});

// // More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
// LoggedIn.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   const loginButton = canvas.getByRole("button", { name: /Log in/i });
//   userEvent.click(loginButton);
// };
