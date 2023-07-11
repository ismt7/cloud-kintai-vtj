import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAppDispatchV2 } from "../../../app/hooks";
import { JobTermList, JobTermStatus } from "../reducers/FetchJobTermList";
import { updateJobTerm } from "../reducers/jobTermReducer";

dayjs.extend(utc);

interface AggregateStartItemProps {
  item: JobTermList;
  setJobTermData: React.Dispatch<React.SetStateAction<JobTermList[]>>;
}

export default function AggregateStartItem({
  item,
  setJobTermData,
}: AggregateStartItemProps) {
  const jobStartDate = dayjs(item.jobStartDate);
  const dispatch = useAppDispatchV2();

  const handleChange = (event: dayjs.Dayjs | null) => {
    if (!event) {
      return;
    }

    setJobTermData((prevJobTermData) =>
      prevJobTermData.map((obj) =>
        obj.targetMonth === item.targetMonth
          ? {
              id: obj.id,
              targetMonth: item.targetMonth,
              jobStartDate: dayjs(event).format("YYYY-MM-DD"),
              jobEndDate: item.jobEndDate,
              status: JobTermStatus.NO_SYNCED,
            }
          : obj
      )
    );

    void dispatch(
      updateJobTerm({
        targetMonth: item.targetMonth,
        jobStartDate: event,
        jobEndDate: dayjs(item.jobEndDate),
      })
    );
  };

  return (
    <DesktopDatePicker
      label="集計開始日"
      format="YYYY/MM/DD"
      value={jobStartDate}
      onChange={handleChange}
      slotProps={{
        textField: { variant: "outlined" },
      }}
    />
  );
}
