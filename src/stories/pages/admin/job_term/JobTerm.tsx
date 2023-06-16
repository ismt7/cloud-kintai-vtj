import { useEffect, useState } from "react";

import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import {
  Box,
  List,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { Provider } from "react-redux";

import Button from "../../../../components/button/Button";
import Footer from "../../../../components/footer/Footer";
import Header from "../../../../components/header/Header";
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks";
import fetchJobTermList, {
  JobTermList,
  JobTermStatus,
} from "../../../../lib/job_term/FetchJobTermList";
import { selectJobTermList, store } from "../../../../lib/store";

const JobTerm = () => {
  const jobTermList = useAppSelector(selectJobTermList);
  const dispatch = useAppDispatch();
  const [targetYear, setTargetYear] = useState(dayjs().year());
  const [jobTermData, setJobTermData] = useState<JobTermList[]>(
    jobTermList.data
  );
  const now = dayjs();

  const targetYearList = [...Array<number>(3)].map(
    (_, i) => dayjs().year() + i - 1
  );

  useEffect(() => {
    void dispatch(
      fetchJobTermList({
        targetDate: now,
      })
    );
  }, []);

  const startDatePickerHandler = (
    event: dayjs.Dayjs | null,
    item: JobTermList
  ) => {
    if (!event) {
      return;
    }

    setJobTermData((prevJobTermData) =>
      prevJobTermData.map((obj) =>
        (obj.id === item.id
          ? {
              id: obj.id,
              targetMonth: obj.targetMonth,
              jobStartDate: dayjs(event).format("YYYY-MM-DD"),
              jobEndDate: obj.jobEndDate,
              status: JobTermStatus.NO_REGISTER,
            }
          : obj)
      )
    );
  };
  const endDatePickerHandler = (
    event: dayjs.Dayjs | null,
    item: JobTermList
  ) => {
    if (!event) {
      return;
    }

    setJobTermData((prevJobTermData) =>
      prevJobTermData.map((obj) =>
        (obj.id === item.id
          ? {
              id: obj.id,
              targetMonth: obj.targetMonth,
              jobStartDate: obj.jobStartDate,
              jobEndDate: dayjs(event).format("YYYY-MM-DD"),
              status: JobTermStatus.NO_REGISTER,
            }
          : obj)
      )
    );
  };

  useEffect(() => {
    setJobTermData(jobTermList.data);
  }, [jobTermList]);

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack sx={{ minHeight: "100vh" }}>
          <Box>
            <Header />
          </Box>
          <Box sx={{ minHeight: "100vh", py: 1 }}>
            <Stack spacing={1} sx={{ display: "inline-block" }}>
              <Box sx={{ p: 1 }}>
                <Typography variant="h5">締日一覧</Typography>
              </Box>
              <Box>
                <List>
                  <Stack direction="row">
                    {targetYearList.map((item) => (
                      <>
                        <Box>
                          <ListItemButton
                            selected={targetYear === item}
                            onClick={() => setTargetYear(item)}
                          >
                            {item}年
                          </ListItemButton>
                        </Box>
                      </>
                    ))}
                  </Stack>
                </List>
              </Box>
              {jobTermData
                .filter((item) => dayjs(item.targetMonth).year() === targetYear)
                .map((item) => (
                  <>
                    <Box sx={{ p: 1 }}>
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Box>
                          <Typography variant="body1">
                            {dayjs(item.targetMonth).format("MM月")}
                          </Typography>
                        </Box>
                        <Box>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Box>
                              <DesktopDatePicker
                                label="集計開始日"
                                format="YYYY/MM/DD"
                                value={dayjs(item.jobStartDate)}
                                onChange={(event) => {
                                  startDatePickerHandler(event, item);
                                }}
                                slotProps={{ textField: { variant: "outlined" } }}
                              />
                            </Box>
                            <Box>〜</Box>
                            <Box>
                              <DesktopDatePicker
                                label="集計終了日"
                                format="YYYY/MM/DD"
                                value={dayjs(item.jobEndDate)}
                                onChange={(event) => {
                                  endDatePickerHandler(event, item);
                                }}
                                slotProps={{ textField: { variant: "outlined" } }}
                              />
                            </Box>
                            <Box>
                              {item.status === JobTermStatus.NO_REGISTER ? (
                                <Typography variant="body1">
                                  <CloudQueueIcon />
                                </Typography>
                              ) : (
                                <Typography variant="body1">
                                  <CloudDoneIcon />
                                </Typography>
                              )}
                            </Box>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </>
                ))}
              <Box sx={{ p: 1 }} textAlign="right">
                <Button label="保存" />
              </Box>
            </Stack>
          </Box>
          <Box>
            <Footer />
          </Box>
        </Stack>
      </LocalizationProvider>
    </Provider>
  );
};
export default JobTerm;
