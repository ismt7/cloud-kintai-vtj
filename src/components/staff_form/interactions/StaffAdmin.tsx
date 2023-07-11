import {
  fireEvent,
  screen,
  userEvent,
  waitFor,
  within,
} from "@storybook/testing-library";

export function GetStaffAdminCreateStaffInteraction() {
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

export function GetStaffAdminUpdateStaffInteraction() {
  return async () => {
    await waitFor(async () => {
      const button = screen.getByRole("button", { name: "保存" });
      expect(button).toBeDisabled();
    });

    // 名前(姓)
    await waitFor(async () => {
      const lastName = screen.queryByTestId("last-name");
      expect(lastName).toBeEnabled();
      if (lastName) {
        void userEvent.clear(lastName);
        void userEvent.type(lastName, "鈴木");
        expect(lastName).toHaveValue("鈴木");
      }
    });

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: "保存" });
      expect(button).toBeEnabled();
    });

    // 名前(名)
    await waitFor(async () => {
      const firstName = screen.queryByTestId("first-name");
      expect(firstName).toBeEnabled();
      if (firstName) {
        void userEvent.clear(firstName);
        void userEvent.type(firstName, "二郎");
        expect(firstName).toHaveValue("二郎");
      }
    });

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: "保存" });
      expect(button).toBeEnabled();
    });

    // メールアドレス(エラー)
    await waitFor(async () => {
      const mailAddress = screen.queryByTestId("mail-address");
      expect(mailAddress).toBeEnabled();
      if (mailAddress) {
        void userEvent.clear(mailAddress);
        void userEvent.type(mailAddress, "aaaa");
        expect(screen.getByText(/入力内容に誤りがあります/i)).toBeEnabled();
      }
    });

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: "保存" });
      expect(button).toBeDisabled();
    });

    // メールアドレス(正常)
    await waitFor(async () => {
      const mailAddress = screen.queryByTestId("mail-address");
      expect(mailAddress).toBeEnabled();
      if (mailAddress) {
        void userEvent.clear(mailAddress);
        void userEvent.type(mailAddress, "suzuki@example.com");
        expect(mailAddress).toHaveValue("suzuki@example.com");
      }
    });

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: "保存" });
      expect(button).toBeEnabled();
    });

    // 役割
    await waitFor(async () => {
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
    });

    await waitFor(async () => {
      const lastName = screen.queryByTestId("last-name");
      const firstName = screen.queryByTestId("first-name");
      const mailAddress = screen.queryByTestId("mail-address");

      if (lastName && firstName && mailAddress) {
        void userEvent.clear(lastName);
        void userEvent.clear(firstName);
        void userEvent.clear(mailAddress);
      }
    });

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: "保存" });
      expect(button).toBeDisabled();
    });
  };
}
