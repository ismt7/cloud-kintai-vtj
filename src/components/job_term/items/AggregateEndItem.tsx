import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { JobTermList, JobTermStatus } from "../reducers/FetchJobTermList";

interface AggregateEndItemProps {
  item: JobTermList;
  setJobTermData: React.Dispatch<React.SetStateAction<JobTermList[]>>;
}

export default function AggregateEndItem({
  item,
  setJobTermData,
}: AggregateEndItemProps) {
  const jobEndDate = dayjs(item.jobEndDate);

  const handleChange = (event: dayjs.Dayjs | null) => {
    if (!event) return;

    setJobTermData((prevJobTermData) =>
      prevJobTermData.map((obj) =>
        obj.id === item.id
          ? {
              id: obj.id,
              targetMonth: obj.targetMonth,
              jobStartDate: obj.jobStartDate,
              jobEndDate: dayjs(event).format("YYYY-MM-DD"),
              status: JobTermStatus.NO_SYNCED,
            }
          : obj
      )
    );
  };

  return (
    <DesktopDatePicker
      label="集計終了日"
      format="YYYY/MM/DD"
      value={jobEndDate}
      onChange={handleChange}
      slotProps={{
        textField: { variant: "outlined" },
      }}
    />
  );
}
