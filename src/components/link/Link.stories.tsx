import { ThemeProvider } from "@mui/material";

import { theme } from "../../lib/theme";

import Link from "./Link";

export default {
  component: Link,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  render: () => (
    <ThemeProvider theme={theme}>
      <Link label="リンク" />
    </ThemeProvider>
  ),
};

export const Default = {
  storyName: "デフォルト",
  args: {
    label: "リンク",
  }
};
