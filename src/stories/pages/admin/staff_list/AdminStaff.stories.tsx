import { MemoryRouter } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Provider } from "react-redux";

import { getStaffList200 } from "../../../../components/time_recorder/mocks/ApiMocks";
import {
  AttendanceStatus,
  testAttendanceSlice,
} from "../../../../lib/reducers/attendanceReducer";
import {
  LoginStaffStatus,
  testLoginStaffReducer,
} from "../../../../lib/reducers/loginStaffReducer";
import {
  RestStatus,
  testRestSlice,
} from "../../../../lib/reducers/restReducer";
import {
  StaffListStatus,
  testStaffListReducer,
} from "../../../../lib/reducers/staffListReducer";
import {
  testTimeRecordListSlice,
  TimeRecordListStatus,
} from "../../../../lib/reducers/timeRecordListReducer";
import {
  testTimeRecordSlice,
  TimeRecordStatus,
  TimeRecordStatusText,
} from "../../../../lib/reducers/timeRecordSlice";

import AdminStaff from "./AdminStaff";

const mockStore = configureStore({
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
          roleId: 2,
          staffId: 999,
          role: {
            roleName: "スタッフ",
          },
        },
      },
    }),
    staffListReducer: testStaffListReducer({
      status: StaffListStatus.PROCESSING,
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

export default {
  title: "Page/Admin/StaffList",
  component: AdminStaff,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    (story) => (
      <Provider store={mockStore}>
        <MemoryRouter>{story()}</MemoryRouter>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof AdminStaff>;

const Template: ComponentStory<typeof AdminStaff> = () => <AdminStaff />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  msw: {
    handlers: [getStaffList200()],
  },
};
