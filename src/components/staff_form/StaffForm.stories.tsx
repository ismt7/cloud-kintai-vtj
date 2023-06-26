import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { expect } from "@storybook/jest";
import { waitFor, within, screen, fireEvent, userEvent } from "@storybook/testing-library";
import { Provider } from "react-redux";

import {
  AttendanceStatus,
  testAttendanceSlice,
} from "../../lib/reducers/attendanceReducer";
import {
  LoginStaffStatus,
  testLoginStaffReducer,
} from "../../lib/reducers/loginStaffReducer";
import { RestStatus, testRestSlice } from "../../lib/reducers/restReducer";
import {
  StaffListStatus,
  testStaffListReducer,
} from "../../lib/reducers/staffListReducer";
import {
  testTimeRecordListSlice,
  TimeRecordListStatus,
} from "../../lib/reducers/timeRecordListReducer";
import {
  testTimeRecordSlice,
  TimeRecordStatus,
  TimeRecordStatusText,
} from "../../lib/reducers/timeRecordSlice";
import { theme } from "../../lib/theme";
import {
  deleteStaffHandler200,
  patchStaffRoleHandler200,
  postStaffHandler200,
  putStaffHandler200,
} from "../time_recorder/mocks";

import StaffForm from "./StaffForm";

export default {
  component: StaffForm,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  parameters: {
    msw: {
      handlers: [
        putStaffHandler200(),
        patchStaffRoleHandler200(),
        postStaffHandler200(),
        deleteStaffHandler200(),
      ],
    },
  },
  render: () => <StaffForm />,
};

const mockStoreForSystemAdmin = configureStore({
  reducer: {
    timeRecordReducer: testTimeRecordSlice({
      status: TimeRecordStatus.PROCESSING,
      statusText: TimeRecordStatusText.PROCESSING,
    }),
    loginStaffReducer: testLoginStaffReducer({
      status: LoginStaffStatus.DONE,
      data: {
        staffId: 999,
        lastName: "田中",
        firstName: "太郎",
        mailAddress: "tanaka@example.com",
        iconPath: "",
        staffRoles: {
          roleId: 1,
          staffId: 999,
          role: {
            roleName: "システム管理者",
          },
        },
      },
    }),
    staffListReducer: testStaffListReducer({
      status: StaffListStatus.DONE,
      data: [],
    }),
    attendanceReducer: testAttendanceSlice({
      status: AttendanceStatus.DONE,
      data: null,
    }),
    restReducer: testRestSlice({
      status: RestStatus.DONE,
      data: null,
    }),
    timeRecordListReducer: testTimeRecordListSlice({
      status: TimeRecordListStatus.DONE,
      data: [],
    }),
  },
});

export const SystemAdmin = {
  storyName: "システム管理者",
  args: {},
  render: () => (
    <Provider store={mockStoreForSystemAdmin}>
      <ThemeProvider theme={theme}>
        <StaffForm />
      </ThemeProvider>
    </Provider>
  ),
  play: async () => {
    const wait = async (ms: number | undefined) =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });

    await wait(500);

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: "作成" });
      expect(button).toBeDisabled();
    });

    // 名前(姓)
    await waitFor(async () => {
      const lastName = screen.queryByTestId("last-name");
      expect(lastName).toBeEnabled();
      if (lastName) {
        void userEvent.type(lastName, "田中");
        expect(lastName).toHaveValue("田中");
      }
    });

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: "作成" });
      expect(button).toBeDisabled();
    });

    // 名前(名)
    await waitFor(async () => {
      const firstName = screen.queryByTestId("first-name");
      expect(firstName).toBeEnabled();
      if (firstName) {
        void userEvent.type(firstName, "太郎");
        expect(firstName).toHaveValue("太郎");
      }
    });

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: "作成" });
      expect(button).toBeDisabled();
    });

    // メールアドレス(エラー)
    await waitFor(async () => {
      const mailAddress = screen.queryByTestId("mail-address");
      expect(mailAddress).toBeEnabled();
      if (mailAddress) {
        void userEvent.type(mailAddress, "aaaa");
        expect(screen.getByText(/入力内容に誤りがあります/i)).toBeEnabled();
      }
    });

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: "作成" });
      expect(button).toBeDisabled();
    });

    // メールアドレス(正常)
    await waitFor(async () => {
      const mailAddress = screen.queryByTestId("mail-address");
      expect(mailAddress).toBeEnabled();
      if (mailAddress) {
        void userEvent.clear(mailAddress);
        void userEvent.type(mailAddress, "tanaka@example.com");
        expect(mailAddress).toHaveValue("tanaka@example.com");
      }
    });

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: "作成" });
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

        expect(options[0]).toHaveTextContent("システム管理者");
        expect(options[1]).toHaveTextContent("スタッフ");
        expect(options[2]).toHaveTextContent("スタッフ管理者");

        fireEvent.click(options[0]);
        expect(button).toHaveTextContent("システム管理者");
      }
    });
  },
};

const mockStoreForStaffAdmin = configureStore({
  reducer: {
    timeRecordReducer: testTimeRecordSlice({
      status: TimeRecordStatus.PROCESSING,
      statusText: TimeRecordStatusText.PROCESSING,
    }),
    loginStaffReducer: testLoginStaffReducer({
      status: LoginStaffStatus.DONE,
      data: {
        staffId: 999,
        lastName: "田中",
        firstName: "太郎",
        mailAddress: "tanaka@example.com",
        iconPath: "",
        staffRoles: {
          roleId: 3,
          staffId: 999,
          role: {
            roleName: "スタッフ管理者",
          },
        },
      },
    }),
    staffListReducer: testStaffListReducer({
      status: StaffListStatus.DONE,
      data: [],
    }),
    attendanceReducer: testAttendanceSlice({
      status: AttendanceStatus.DONE,
      data: null,
    }),
    restReducer: testRestSlice({
      status: RestStatus.DONE,
      data: null,
    }),
    timeRecordListReducer: testTimeRecordListSlice({
      status: TimeRecordListStatus.PROCESSING,
      data: [],
    }),
  },
});

export const StaffAdmin = {
  storyName: "スタッフ管理者",
  args: {},
  render: () => (
    <Provider store={mockStoreForStaffAdmin}>
      <ThemeProvider theme={theme}>
        <StaffForm />
      </ThemeProvider>
    </Provider>
  ),
  play: async () => {
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
  },
};

const mockStoreUpdateStaff = configureStore({
  reducer: {
    timeRecordReducer: testTimeRecordSlice({
      status: TimeRecordStatus.PROCESSING,
      statusText: TimeRecordStatusText.PROCESSING,
    }),
    loginStaffReducer: testLoginStaffReducer({
      status: LoginStaffStatus.DONE,
      data: {
        staffId: 999,
        lastName: "田中",
        firstName: "太郎",
        mailAddress: "tanaka@example.com",
        iconPath: "",
        staffRoles: {
          roleId: 3,
          staffId: 999,
          role: {
            roleName: "スタッフ管理者",
          },
        },
      },
    }),
    staffListReducer: testStaffListReducer({
      status: StaffListStatus.DONE,
      data: [],
      selectedData: {
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
    attendanceReducer: testAttendanceSlice({
      status: AttendanceStatus.DONE,
      data: null,
    }),
    restReducer: testRestSlice({
      status: RestStatus.DONE,
      data: null,
    }),
    timeRecordListReducer: testTimeRecordListSlice({
      status: TimeRecordListStatus.PROCESSING,
      data: [],
    }),
  },
});

export const UpdateStaff = {
  storyName: "スタッフ更新",
  args: {},
  render: () => (
    <Provider store={mockStoreUpdateStaff}>
      <ThemeProvider theme={theme}>
        <StaffForm />
      </ThemeProvider>
    </Provider>
  ),
  play: async () => {
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
},
};
