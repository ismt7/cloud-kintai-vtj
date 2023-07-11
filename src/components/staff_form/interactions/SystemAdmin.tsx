import {
  fireEvent,
  screen,
  userEvent,
  within,
} from "@storybook/testing-library";

export default function SystemAdminCreateStaffInteraction() {
  return async () => {
    const staffRole = screen.queryByTestId("staff-role");

    if (staffRole) {
      const button = within(staffRole).getByRole("button");
      void userEvent.click(button);

      const listbox = within(screen.getByRole("presentation")).getByRole(
        "listbox"
      );
      const options = within(listbox).getAllByRole("option");

      expect(options[0]).toHaveTextContent("スタッフ");
      expect(options[1]).toHaveTextContent("スタッフ管理者");

      fireEvent.click(options[1]);
      expect(button).toHaveTextContent("スタッフ管理者");
    }
  };
}
