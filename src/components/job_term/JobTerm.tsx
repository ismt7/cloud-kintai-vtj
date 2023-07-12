import { useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { selectJobTermList } from "../../lib/store";
import Button from "../button/Button";
import AggregateRangeItem from "./items/AggregateRangeItem";
import MonthLabelItem from "./items/MonthLabelItem";
import TargetYearRangeItem from "./items/TargetYearRangeItem";
import fetchJobTermList, { JobTermList } from "./reducers/FetchJobTermList";

const JobTerm = () => {
  const { data: jobTerm } = useAppSelector(selectJobTermList);
  const now = dayjs();
  const defaultYear = now.year();
  const params = useParams();
  const targetYear = Number(params.targetYear ?? defaultYear);
  const [jobTermData, setJobTermData] = useState<JobTermList[]>(jobTerm);

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(
      fetchJobTermList({
        targetDate: now,
      })
    );
  }, []);

  useEffect(() => {
    setJobTermData(jobTerm);
  }, [jobTerm]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={1} sx={{ display: "inline-block" }}>
        <Box>
          <TargetYearRangeItem targetYear={targetYear} />
        </Box>
        {jobTermData
          .filter(
            (item) => Number(item.targetMonth.substring(0, 4)) === targetYear
          )
          .map((item) => (
            <>
              <Box sx={{ p: 1 }}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Box sx={{ textAlign: "right", width: "40px" }}>
                    <MonthLabelItem targetMonth={item.targetMonth} />
                  </Box>
                  <Box>
                    <AggregateRangeItem
                      item={item}
                      setJobTermData={setJobTermData}
                    />
                  </Box>
                </Stack>
              </Box>
            </>
          ))}
        <Box sx={{ p: 1 }} textAlign="center">
          <Button label="まとめて保存" />
        </Box>
      </Stack>
    </LocalizationProvider>
  );
};
export default JobTerm;
