import { expect } from "@storybook/jest";

import {
  fireEvent,
  screen,
  userEvent,
  within,
} from "@storybook/testing-library";

export function GetStaffAdminCreateStaffInteraction() {
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

      expect(options[0]).toHaveTextContent("スタッフ");
      expect(options[1]).toHaveTextContent("スタッフ管理者");

      fireEvent.click(options[1]);

      await sleep(500);

      expect(button).toHaveTextContent("スタッフ管理者");
    }
  };
}

export function GetStaffAdminUpdateStaffInteraction() {
  return async () => {
    const sleep = async (ms: number | undefined) =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });

    const button = screen.getByRole("button", { name: "保存" });
    expect(button).toBeDisabled();

    // 名前(姓)
    const lastName = screen.queryByTestId("last-name");
    expect(lastName).toBeEnabled();
    if (lastName) {
      void userEvent.clear(lastName);
      void userEvent.type(lastName, "鈴木");
      await sleep(500);

      expect(lastName).toHaveValue("鈴木");
    }

    expect(button).toBeEnabled();

    // 名前(名)
    const firstName = screen.queryByTestId("first-name");
    expect(firstName).toBeEnabled();
    if (firstName) {
      void userEvent.clear(firstName);
      void userEvent.type(firstName, "二郎");
      await sleep(500);

      expect(firstName).toHaveValue("二郎");
    }

    expect(button).toBeEnabled();

    // メールアドレス(エラー)
    const mailAddress = screen.queryByTestId("mail-address");
    expect(mailAddress).toBeEnabled();
    if (mailAddress) {
      void userEvent.clear(mailAddress);
      void userEvent.type(mailAddress, "aaaa");
      await sleep(500);

      expect(screen.getByText(/入力内容に誤りがあります/i)).toBeEnabled();
    }

    expect(button).toBeDisabled();

    // メールアドレス(正常)
    expect(mailAddress).toBeEnabled();
    if (mailAddress) {
      void userEvent.clear(mailAddress);
      void userEvent.type(mailAddress, "suzuki@example.com");
      await sleep(500);

      expect(mailAddress).toHaveValue("suzuki@example.com");
    }

    expect(button).toBeEnabled();

    // 役割
    const staffRole = screen.queryByTestId("staff-role");
    if (staffRole) {
      const selectButton = within(staffRole).getByRole("button");
      void userEvent.click(selectButton);

      await sleep(500);

      const listbox = within(screen.getByRole("presentation")).getByRole(
        "listbox"
      );
      const options = within(listbox).getAllByRole("option");

      expect(options[0]).toHaveTextContent("スタッフ");
      expect(options[1]).toHaveTextContent("スタッフ管理者");

      fireEvent.click(options[1]);
      await sleep(500);

      expect(selectButton).toHaveTextContent("スタッフ管理者");
    }

    if (lastName) void userEvent.clear(lastName);
    if (firstName) void userEvent.clear(firstName);
    if (mailAddress) void userEvent.clear(mailAddress);
    await sleep(500);

    expect(button).toBeDisabled();
  };
}
