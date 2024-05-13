import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Chip, IconButton, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldArrayWithId,
  UseFieldArrayUpdate,
} from "react-hook-form";

import { AttendanceEditInputs } from "../../../common";

export default function RestEndTimeInput({
  workDate,
  rest,
  index,
  control,
  restUpdate,
}: {
  workDate: dayjs.Dayjs;
  rest: FieldArrayWithId<AttendanceEditInputs, "rests", "id">;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
  restUpdate: UseFieldArrayUpdate<AttendanceEditInputs, "rests">;
}) {
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  useEffect(() => {
    setEnableEndTime(!!rest.endTime);
  }, [rest]);

  if (!enableEndTime) {
    return (
      <Box>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            setEnableEndTime(true);
          }}
        >
          終了時間を追加
        </Button>
      </Box>
    );
  }

  return (
    <Stack direction="row" spacing={1}>
      <Stack spacing={1}>
        <Controller
          name={`rests.${index}.endTime`}
          control={control}
          render={({ field }) => (
            <TimePicker
              value={rest.endTime ? dayjs(rest.endTime) : null}
              ampm={false}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              slotProps={{
                textField: { size: "small" },
              }}
              onChange={(newEndTime) => {
                if (!newEndTime) {
                  field.onChange(null);
                  return;
                }

                if (!newEndTime.isValid()) {
                  return;
                }

                const formattedEndTime = newEndTime
                  .year(workDate.year())
                  .month(workDate.month())
                  .date(workDate.date())
                  .second(0)
                  .millisecond(0)
                  .toISOString();
                field.onChange(formattedEndTime);
              }}
            />
          )}
        />
        <Box>
          <DefaultEndTimeChip
            index={index}
            workDate={workDate}
            restUpdate={restUpdate}
            rest={rest}
          />
        </Box>
      </Stack>
      <Box>
        <ClearButton
          index={index}
          rest={rest}
          restUpdate={restUpdate}
          setEnableEndTime={setEnableEndTime}
        />
      </Box>
    </Stack>
  );
}

function DefaultEndTimeChip({
  index,
  workDate,
  restUpdate,
  rest,
}: {
  index: number;
  workDate: dayjs.Dayjs;
  restUpdate: UseFieldArrayUpdate<AttendanceEditInputs, "rests">;
  rest: FieldArrayWithId<AttendanceEditInputs, "rests", "id">;
}) {
  const clickHandler = () => {
    const endTime = workDate
      .hour(13)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toISOString();
    restUpdate(index, { ...rest, endTime });
  };

  return (
    <Chip
      label="13:00"
      variant="outlined"
      color="success"
      icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
      onClick={clickHandler}
    />
  );
}

function ClearButton({
  index,
  rest,
  restUpdate,
  setEnableEndTime,
}: {
  index: number;
  rest: FieldArrayWithId<AttendanceEditInputs, "rests", "id">;
  restUpdate: UseFieldArrayUpdate<AttendanceEditInputs, "rests">;
  setEnableEndTime: (enable: boolean) => void;
}) {
  const handleClick = () => {
    restUpdate(index, { ...rest, endTime: null });
    setEnableEndTime(false);
  };

  return (
    <IconButton onClick={handleClick}>
      <ClearIcon />
    </IconButton>
  );
}
