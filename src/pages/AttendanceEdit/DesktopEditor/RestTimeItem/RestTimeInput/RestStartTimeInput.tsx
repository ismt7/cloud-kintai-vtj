import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Chip, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext } from "react";
import { Controller, FieldArrayWithId } from "react-hook-form";

import { AppConfigContext } from "@/context/AppConfigContext";
import { AttendanceEditContext } from "@/pages/AttendanceEdit/AttendanceEditProvider";

import { AttendanceEditInputs } from "../../../common";

type RestStartTimeInputProp = {
  rest: FieldArrayWithId<AttendanceEditInputs, "rests", "id">;
  index: number;
};

export default function RestStartTimeInput({
  rest,
  index,
}: RestStartTimeInputProp) {
  const { workDate, changeRequests, control, restUpdate } = useContext(
    AttendanceEditContext
  );
  const { getLunchRestStartTime } = useContext(AppConfigContext);

  if (!workDate || !control || !restUpdate) return null;

  const lunchRestStartTime = getLunchRestStartTime().format("HH:mm");

  return (
    <Stack spacing={1}>
      <Controller
        name={`rests.${index}.startTime`}
        control={control}
        render={({ field }) => (
          <TimePicker
            value={rest.startTime ? dayjs(rest.startTime) : null}
            ampm={false}
            disabled={changeRequests.length > 0}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
            }}
            slotProps={{
              textField: {
                size: "small",
                inputProps: { "data-testid": `rest-start-time-input-${index}` },
              },
            }}
            onChange={(newStartTime) => {
              if (!newStartTime) return null;

              if (!newStartTime.isValid()) {
                return;
              }

              const formattedStartTime = newStartTime
                .year(workDate.year())
                .month(workDate.month())
                .date(workDate.date())
                .second(0)
                .millisecond(0)
                .toISOString();
              field.onChange(formattedStartTime);
            }}
          />
        )}
      />
      <Box>
        <Chip
          label={lunchRestStartTime}
          variant="outlined"
          color="success"
          icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
          disabled={changeRequests.length > 0}
          data-testid={`rest-lunch-chip-${index}`}
          onClick={() => {
            const startTime = dayjs(
              `${workDate.format("YYYY-MM-DD")} ${lunchRestStartTime}`
            )
              .second(0)
              .millisecond(0)
              .toISOString();
            restUpdate(index, { ...rest, startTime });
          }}
        />
      </Box>
    </Stack>
  );
}
