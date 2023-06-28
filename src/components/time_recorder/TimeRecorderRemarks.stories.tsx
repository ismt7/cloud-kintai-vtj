import { ThemeProvider } from "@mui/material";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, screen } from "@storybook/testing-library";
import { Provider } from "react-redux";

import { store } from "../../app/store";
import { theme } from "../../lib/theme";

import TimeRecorderRemarks, {
  TimeRecorderRemarksProps,
} from "./TimeRecorderRemarks";

const meta: Meta<typeof TimeRecorderRemarks> = {
  component: TimeRecorderRemarks,
  render: (args: TimeRecorderRemarksProps) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <TimeRecorderRemarks {...args} />
      </ThemeProvider>
    </Provider>
  ),
};

export default meta;
type Story = StoryObj<typeof TimeRecorderRemarks>;

export const Default: Story = {
  args: {
    staffId: 1,
  },
  play: async () => {
    const inputClearText = "このテキストは入力後にクリアされるテキストです。";
    const remarksClearText = screen.getByRole("textbox");
    void userEvent.type(remarksClearText, inputClearText);

    const afterRemarksText = screen.getByRole("textbox");
    expect(afterRemarksText).toHaveValue(inputClearText);

    await waitFor(() => {
      const clearButton = screen.getByTestId("remarksClear");
      void userEvent.click(clearButton);
    });

    await waitFor(() => {
      const afterClearRemarksText = screen.getByRole("textbox");
      expect(afterClearRemarksText).toHaveValue("");
    });

    const inputSaveText = "このテキストは入力後に保存されるテキストです。";
    const remarksSaveText = screen.getByRole("textbox");
    void userEvent.type(remarksSaveText, inputSaveText);

    const saveButton = screen.getByTestId("remarksSave");
    void userEvent.click(saveButton);
  },
};
