import { expect } from "@storybook/jest";
import {
  fireEvent,
  screen,
  userEvent,
  within,
} from "@storybook/testing-library";

export default function SystemAdminCreateStaffInteraction() {
  return async () => {
    const sleep = async (ms: number | undefined) =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });

    const staffRole = screen.queryByTestId("staff-role");

    if (staffRole) {
      const button = within(staffRole).getByRole("button");
      void userEvent.click(button);

      await sleep(500);

      const listbox = within(screen.getByRole("presentation")).getByRole(
        "listbox"
      );
      const options = within(listbox).getAllByRole("option");

      expect(options[1]).toHaveTextContent("スタッフ");
      expect(options[2]).toHaveTextContent("スタッフ管理者");

      fireEvent.click(options[2]);

      await sleep(500);

      expect(button).toHaveTextContent("スタッフ管理者");
    }
  };
}
