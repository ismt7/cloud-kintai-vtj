import { Box, Button, Stack, Typography } from "@mui/material";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

function DateCell({
  index,
  date,
  beforeDate,
  onChange,
}: {
  index: number;
  date: dayjs.Dayjs;
  beforeDate: dayjs.Dayjs;
  onChange: (
    value: Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => void;
}) {
  const [dayCount, setDayCount] = useState<number>(0);

  useEffect(() => {
    setDayCount(dayjs(date).diff(beforeDate, "day"));
  }, [date, beforeDate]);

  return (
    <Stack key={index} direction="row" alignItems="center" spacing={2}>
      <DatePicker value={date} format="YYYY/MM/DD" onChange={onChange} />
      <Box>
        <Typography variant="body1">
          {index === 0 ? "(当月)" : `${dayCount}日`}
        </Typography>
      </Box>
    </Stack>
  );
}

const initialDates = [...Array(12).keys()].map((_, index) => {
  const date = dayjs().add(index, "month").date(20);
  return date;
});

export default function AdminMaster() {
  const [closingDates, setClosingDates] = useState<dayjs.Dayjs[]>(initialDates);

  return (
    <Stack spacing={2} sx={{ px: 5, pt: 2 }}>
      <Typography
        variant="h4"
        sx={{ pl: 1, borderBottom: "solid 5px #0FA85E", color: "#0FA85E" }}
      >
        締日管理
      </Typography>
      <Typography>
        月ごとに勤怠を締める日付を指定します。当月から1年分表示されています。
      </Typography>
      {/* <Stack spacing={2} sx={{ width: 200 }}> */}
      <Stack spacing={2}>
        {closingDates.map((date, index) => (
          <DateCell
            key={index}
            index={index}
            date={date}
            beforeDate={closingDates[index - 1]}
            onChange={(value) => {
              if (value) {
                const newDates = [...closingDates];
                newDates[index] = value;
                setClosingDates(newDates);
              }
            }}
          />
        ))}
      </Stack>
      <Box>
        <Button variant="contained">保存</Button>
      </Box>
    </Stack>
  );
}
