import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, within } from "@testing-library/react";
import { Provider } from "react-redux";

import DownloadForm from "../../../components/download_form/DownloadForm";
import { LoginStaffStatus, testLoginStaffReducer } from "../../../lib/reducers/loginStaffReducer";
import { StaffListStatus, testStaffListReducer } from "../../../lib/reducers/staffListReducer";

const mockStore = configureStore({
  reducer: {
    loginStaffReducer: testLoginStaffReducer({
      status: LoginStaffStatus.DONE,
      data: {
        staffId: 999,
        lastName: "田中",
        firstName: "太郎",
        mailAddress: "tanaka@example.com",
        iconPath: "",
        staffRoles: {
          roleId: 2,
          staffId: 999,
          role: {
            roleName: "スタッフ",
          },
        },
      },
    }),
    staffListReducer: testStaffListReducer({
      status: StaffListStatus.DONE,
      data: [],
    }),
  },
});

describe("DownloadForm Component(", () => {
  test("ダウンロードフォームにレイアウト崩れがないか(ビジュアルリグレッション)", () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <DownloadForm />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test.skip("選択した値が表示されているか", () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <DownloadForm />
      </Provider>
    );

    const autocomplete = getByTestId("autocomplete");
    const input = within(autocomplete).getByRole("combobox");
    expect(input.innerText).toBeUndefined();

    autocomplete.focus();
    fireEvent.change(input, { target: { value: "田中 太郎" } });
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });

    const autocompleteAfter = getByTestId("autocomplete");
    const inputAfter = within(autocompleteAfter).getByRole("combobox");
    expect(inputAfter.innerText).toEqual("田中 太郎");
  });
});
