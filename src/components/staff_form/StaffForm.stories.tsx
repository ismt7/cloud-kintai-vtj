import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Provider } from "react-redux";
import {
  AttendanceStatus,
  testAttendanceSlice,
} from "../../lib/reducers/attendanceReducer";
import { RestStatus, testRestSlice } from "../../lib/reducers/restReducer";
import {
  StaffListStatus,
  testStaffListReducer,
} from "../../lib/reducers/staffListReducer";
import {
  StaffStatus,
  testStaffRecordSlice,
} from "../../lib/reducers/staffSlice";
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
import StaffForm from "./StaffForm";

const mockStore = configureStore({
  reducer: {
    timeRecordReducer: testTimeRecordSlice({
      status: TimeRecordStatus.PROCESSING,
      statusText: TimeRecordStatusText.PROCESSING,
    }),
    staffReducer: testStaffRecordSlice({
      status: StaffStatus.DONE,
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

export default {
  title: "Component/StaffForm",
  component: StaffForm,
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
} as ComponentMeta<typeof StaffForm>;

const Template: ComponentStory<typeof StaffForm> = () => <StaffForm />;

export const Default = Template.bind({});
Default.storyName = "デフォルト";
Default.args = {};
