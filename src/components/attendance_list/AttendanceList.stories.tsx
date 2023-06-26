import AttendanceList from "./AttendanceList";

export default {
  component: AttendanceList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export const Default = {
  render: () => <AttendanceList />,
  args: {},
};
