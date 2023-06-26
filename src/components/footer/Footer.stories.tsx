import { ThemeProvider } from "@mui/material";

import { theme } from "../../lib/theme";

import Footer from "./Footer";

export default {
  component: Footer,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export const Default = {
  render: () => (
    <ThemeProvider theme={theme}>
      <Footer />
    </ThemeProvider>
  ),
  args: {},
};
