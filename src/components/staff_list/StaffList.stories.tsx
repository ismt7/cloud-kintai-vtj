import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { screen, userEvent, waitFor } from "@storybook/testing-library";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import GetStaffs from "./mocks/ApiMock";
import StaffList, { LoginStaff } from "./StaffList";

const loginStaff: LoginStaff = {
  last_name: "ダミー",
  first_name: "太郎",
  mail_address: "example@example.com",
  icon_path: "",
  id: 1,
  cognito_user_id: "DUMMY_COGNITO_USER_ID",
  created_at: "2023-01-01T00:00:00Z",
  updated_at: null,
  created_by: 1,
  updated_by: null,
};

const meta: Meta<typeof StaffList> = {
  component: StaffList,
  parameters: {
    msw: {
      handlers: [GetStaffs()],
    },
  },
  render: () => (
    <MemoryRouter initialEntries={["/admin/staff/999"]}>
      <Routes>
        <Route
          path="/admin/staff"
          element={<StaffList loginStaff={loginStaff} />}
        />
        <Route
          path="/admin/staff/:staffId"
          element={<StaffList loginStaff={loginStaff} />}
        />
      </Routes>
    </MemoryRouter>
  ),
};

export default meta;
type Story = StoryObj<typeof StaffList>;

export const Default: Story = {
  name: "デフォルト",
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
