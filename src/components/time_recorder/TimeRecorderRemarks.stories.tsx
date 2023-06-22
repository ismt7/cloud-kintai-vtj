import { ThemeProvider } from "@mui/material";
import { expect } from "@storybook/jest";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, within, waitFor } from "@storybook/testing-library";
import { Provider } from "react-redux";

import { store } from "../../app/store";
import { theme } from "../../lib/theme";

import TimeRecorderRemarks from "./TimeRecorderRemarks";

export default {
  title: "Component/TimeRecorder/TimeRecorderRemarks",
  component: TimeRecorderRemarks,
  decorators: [
    (story) => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{story()}</ThemeProvider>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof TimeRecorderRemarks>;

const Template: ComponentStory<typeof TimeRecorderRemarks> = (args) => (
  <TimeRecorderRemarks {...args} />
);

export const Default = Template.bind({});
Default.args = {
  staffId: 1,
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const inputClearText = "このテキストは入力後にクリアされるテキストです。";
  const remarksClearText = canvas.getByRole("textbox");
  void userEvent.type(remarksClearText, inputClearText);

  const afterRemarksText = canvas.getByRole("textbox");
  expect(afterRemarksText).toHaveValue(inputClearText);

  await waitFor(() => {
    const clearButton = canvas.getByTestId("remarksClear");
    void userEvent.click(clearButton);
  });

  await waitFor(() => {
    const afterClearRemarksText = canvas.getByRole("textbox");
    expect(afterClearRemarksText).toHaveValue("");
  });

  const inputSaveText = "このテキストは入力後に保存されるテキストです。";
  const remarksSaveText = canvas.getByRole("textbox");
  void userEvent.type(remarksSaveText, inputSaveText);

  const saveButton = canvas.getByTestId("remarksSave");
  void userEvent.click(saveButton);
};
