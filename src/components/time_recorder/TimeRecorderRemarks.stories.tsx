import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";
import { Provider } from "react-redux";

import { store } from "../../app/store";

import TimeRecorderRemarks, {
  TimeRecorderRemarksProps,
} from "./TimeRecorderRemarks";

const meta: Meta<typeof TimeRecorderRemarks> = {
  component: TimeRecorderRemarks,
  render: (args: TimeRecorderRemarksProps) => (
    <Provider store={store}>
      <TimeRecorderRemarks {...args} />
    </Provider>
  ),
};

export default meta;
type Story = StoryObj<typeof TimeRecorderRemarks>;

export const Default: Story = {
  args: {},
  play: async () => {
    const sleep = async (ms: number | undefined) =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });

    const inputClearText = "このテキストは入力後にクリアされるテキストです。";
    const remarksText = screen.getByRole("textbox");
    void userEvent.type(remarksText, inputClearText);
    await sleep(500);

    expect(remarksText).toHaveValue(inputClearText);

    const clearButton = screen.getByTestId("remarksClear");
    void userEvent.click(clearButton);
    await sleep(500);

    expect(remarksText).toHaveValue("");

    const inputSaveText = "このテキストは入力後に保存されるテキストです。";
    void userEvent.type(remarksText, inputSaveText);
    await sleep(500);

    expect(remarksText).toHaveValue(inputSaveText);

    const saveButton = screen.getByTestId("remarksSave");
    void userEvent.click(saveButton);
  },
};
