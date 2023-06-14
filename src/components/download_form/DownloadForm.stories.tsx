// cspell:words reduxjs
import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Provider } from "react-redux";

import {
  LoginStaffStatus,
  testLoginStaffReducer,
} from "../../lib/reducers/loginStaffReducer";
import {
  StaffListStatus,
  testStaffListReducer,
} from "../../lib/reducers/staffListReducer";
import { theme } from "../../lib/theme";
import { getStaffList200 } from "../time_recorder/mocks";

import DownloadForm from "./DownloadForm";

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

export default {
  title: "Component/DownloadForm",
  component: DownloadForm,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    (story) => (
      <Provider store={mockStore}>
        <ThemeProvider theme={theme}>{story()}</ThemeProvider>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof DownloadForm>;

const Template: ComponentStory<typeof DownloadForm> = () => <DownloadForm />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  msw: {
    handlers: [getStaffList200()],
  },
};
