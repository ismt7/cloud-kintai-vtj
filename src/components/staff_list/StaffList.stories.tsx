import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, screen } from "@storybook/testing-library";
import { Provider } from "react-redux";

import StaffList from "./StaffList";
import GetStaffList200 from "./mocks/ApiMock";
import GetDefaultStoreMock from "./mocks/ReducerMock";

const meta: Meta<typeof StaffList> = {
  component: StaffList,
  render: () => (
    <Provider store={GetDefaultStoreMock()}>
      <StaffList />
    </Provider>
  ),
};

export default meta;
type Story = StoryObj<typeof StaffList>;

export const Default: Story = {
  storyName: "デフォルト",
  parameters: {
    msw: {
      handlers: [GetStaffList200()],
    },
  },
  play: async () => {
    const sleep = async (ms: number | undefined) =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });

    const searchInput = screen.getByRole("textbox");
    void userEvent.type(searchInput, "田中");

    await sleep(1000);

    await waitFor(() => {
      const searchButton = screen.getByTestId("SearchIcon");
      void userEvent.click(searchButton);
    });

    await waitFor(() => {
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(list).toHaveTextContent("田中 太郎");
      expect(list).not.toHaveTextContent("山田 花子");
    });
  },
};
