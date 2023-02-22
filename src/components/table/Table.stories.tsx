import { ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import dayjs from "dayjs";
import { rest } from "msw";
import { Provider } from "react-redux";
import {
  AttendanceStatus,
  testAttendanceSlice,
} from "../../lib/reducers/attendanceReducer";
import { RestStatus, testRestSlice } from "../../lib/reducers/restReducer";
import {
  StaffStatus,
  testLoginStaffReducer,
} from "../../lib/reducers/loginStaffReducer";
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
import Table from "./Table";

const REACT_APP_BASE_PATH = process.env.REACT_APP_BASE_PATH || "";

const mockStore = configureStore({
  reducer: {
    timeRecordReducer: testTimeRecordSlice({
      status: TimeRecordStatus.PROCESSING,
      statusText: TimeRecordStatusText.PROCESSING,
    }),
    loginStaffReducer: testLoginStaffReducer({
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
  title: "Component/Table",
  component: Table,
  decorators: [
    (story) => (
      <Provider store={mockStore}>
        <ThemeProvider theme={theme}>{story()}</ThemeProvider>
      </Provider>
    ),
  ],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = () => <Table />;

export const Primary = Template.bind({});
Primary.args = {};

const now = dayjs();
const fromDate = now.subtract(30, "d");
Primary.parameters = {
  msw: {
    handlers: [
      rest.get(
        `${REACT_APP_BASE_PATH}/attendances/1/${fromDate.format(
          "YYYYMMDD"
        )}/${now.format("YYYYMMDD")}`,
        (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json(
              (() => {
                const data = [];
                for (let i = 0; i < 10; i += 1) {
                  const targetDate = now.subtract(Math.abs(i - 9), "d");
                  const isHoliday = [0, 6].indexOf(targetDate.day()) !== -1;

                  // eslint-disable-next-line no-continue
                  if (isHoliday) continue;

                  data.push({
                    attendance_id: i + 1,
                    staff_id: 1,
                    work_date: targetDate.format("YYYY-MM-DD"),
                    start_time: `${targetDate.format("YYYY-MM-DD")}T09:00:00`,
                    end_time: `${targetDate.format("YYYY-MM-DD")}T18:00:00`,
                    go_directly_flag: false,
                    return_directly_flag: false,
                    remarks: isHoliday ? "" : "備考です",
                  });
                }
                return data;
              })()
            )
          )
      ),
      rest.get(
        `${REACT_APP_BASE_PATH}/rests/1/${fromDate.format(
          "YYYYMMDD"
        )}/${now.format("YYYYMMDD")}`,
        (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json(
              (() => {
                const data = [];
                for (let i = 0; i < 10; i += 1) {
                  const targetDate = now.subtract(Math.abs(i - 9), "d");
                  const isHoliday = [0, 6].indexOf(targetDate.day()) !== -1;

                  // eslint-disable-next-line no-continue
                  if (isHoliday) continue;

                  data.push({
                    rest_time_id: i + 1,
                    staff_id: 1,
                    work_date: targetDate.format("YYYY-MM-DD"),
                    start_time: `${targetDate.format("YYYY-MM-DD")}T12:00:00`,
                    end_time: `${targetDate.format("YYYY-MM-DD")}T13:00:00`,
                  });
                }
                return data;
              })()
            )
          )
      ),
    ],
  },
};
