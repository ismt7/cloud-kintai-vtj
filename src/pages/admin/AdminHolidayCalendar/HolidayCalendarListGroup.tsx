import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import {
  CompanyHolidayCalendar,
  CreateCompanyHolidayCalendarInput,
  DeleteCompanyHolidayCalendarInput,
  HolidayCalendar,
  UpdateCompanyHolidayCalendarInput,
} from "../../../API";
import CompanyHolidayCalendarList from "./CompanyHolidayCalendarList";
import HolidayCalendarList from "./HolidayCalendarList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function HolidayCalendarListGroup({
  holidayCalendars,
  companyHolidayCalendars,
  createCompanyHolidayCalendar,
  deleteCompanyHolidayCalendar,
  updateCompanyHolidayCalendar,
}: {
  holidayCalendars: HolidayCalendar[];
  companyHolidayCalendars: CompanyHolidayCalendar[];
  createCompanyHolidayCalendar: (
    input: CreateCompanyHolidayCalendarInput
  ) => Promise<CompanyHolidayCalendar>;
  deleteCompanyHolidayCalendar: (
    input: DeleteCompanyHolidayCalendarInput
  ) => Promise<CompanyHolidayCalendar>;
  updateCompanyHolidayCalendar: (
    input: UpdateCompanyHolidayCalendarInput
  ) => Promise<CompanyHolidayCalendar>;
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="法定休日" {...a11yProps(0)} />
          <Tab label="会社休日" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <HolidayCalendarList holidayCalendars={holidayCalendars} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CompanyHolidayCalendarList
          companyHolidayCalendars={companyHolidayCalendars}
          createCompanyHolidayCalendar={createCompanyHolidayCalendar}
          updateCompanyHolidayCalendar={updateCompanyHolidayCalendar}
          deleteCompanyHolidayCalendar={deleteCompanyHolidayCalendar}
        />
      </CustomTabPanel>
    </Box>
  );
}
