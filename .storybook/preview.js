import "../src/index.css";
import { initialize, mswDecorator } from "msw-storybook-addon";

import { ThemeProvider } from "@mui/material";

import { theme } from "../src/lib/theme";

initialize();

export const decorators = [
  mswDecorator,
  (Story) => {
    return (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
