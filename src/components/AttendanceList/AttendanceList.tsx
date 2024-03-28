import {
  Box,
  Breadcrumbs,
  LinearProgress,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Logger } from "aws-amplify";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatchV2 } from "../../app/hooks";
import * as MESSAGE_CODE from "../../errors";
import useAttendances from "../../hooks/useAttendances/useAttendances";
import useCompanyHolidayCalendars from "../../hooks/useCompanyHolidayCalendars/useCompanyHolidayCalendars";
import useHolidayCalendars from "../../hooks/useHolidayCalendars/useHolidayCalendars";
import { setSnackbarError } from "../../lib/reducers/snackbarReducer";
import Title from "../Title/Title";
import DesktopList from "./DesktopList";
import MobileList from "./MobileList/MobileList";
import { AuthContext } from "../../Layout";

const DescriptionTypography = styled(Typography)(({ theme }) => ({
  padding: "0px 40px",
  [theme.breakpoints.down("md")]: {
    padding: "0px 10px",
  },
}));

export default function AttendanceTable() {
  const { cognitoUser } = useContext(AuthContext);
  const dispatch = useAppDispatchV2();
  const navigate = useNavigate();
  const { attendances, getAttendances } = useAttendances();
  const {
    holidayCalendars,
    loading: holidayCalendarLoading,
    error: holidayCalendarError,
  } = useHolidayCalendars();
  const {
    companyHolidayCalendars,
    loading: companyHolidayCalendarLoading,
    error: companyHolidayCalendarError,
  } = useCompanyHolidayCalendars();

  const logger = new Logger(
    "AttendanceList",
    import.meta.env.DEV ? "DEBUG" : "ERROR"
  );

  useEffect(() => {
    if (!cognitoUser) return;

    getAttendances(cognitoUser.id).catch((error) => {
      logger.debug(error);
      dispatch(setSnackbarError(MESSAGE_CODE.E02001));
    });
  }, [cognitoUser]);

  if (holidayCalendarLoading || companyHolidayCalendarLoading) {
    return <LinearProgress />;
  }

  if (holidayCalendarError || companyHolidayCalendarError) {
    dispatch(setSnackbarError(MESSAGE_CODE.E00001));
    return null;
  }

  return (
    <Stack spacing={2}>
      <Box>
        <Breadcrumbs>
          <Link to="/" color="inherit">
            TOP
          </Link>
          <Typography color="text.primary">勤怠一覧</Typography>
        </Breadcrumbs>
      </Box>
      <Box>
        <Title>勤怠一覧</Title>
      </Box>
      <DescriptionTypography variant="body1">
        今日から30日前までの勤怠情報を表示しています
      </DescriptionTypography>
      <DesktopList
        attendances={attendances}
        holidayCalendars={holidayCalendars}
        companyHolidayCalendars={companyHolidayCalendars}
        navigate={navigate}
      />
      <MobileList
        attendances={attendances}
        holidayCalendars={holidayCalendars}
        companyHolidayCalendars={companyHolidayCalendars}
      />
    </Stack>
  );
}
