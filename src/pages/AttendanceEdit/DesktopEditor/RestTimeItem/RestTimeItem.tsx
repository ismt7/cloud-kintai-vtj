import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import { Box, IconButton, Stack, styled, Typography } from "@mui/material";
import dayjs from "dayjs";
import {
  Control,
  FieldArrayMethodProps,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { AttendanceEditInputs, RestInputs } from "../../common";
import NoRestTimeMessage from "./NoRestTimeMessage";
import { RestTimeInput } from "./RestTimeInput/RestTimeInput";

const Label = styled(Typography)(() => ({
  width: "150px",
  fontWeight: "bold",
}));

export default function RestTimeItem({
  restFields,
  workDate,
  watch,
  restRemove,
  control,
  setValue,
  restAppend,
}: {
  restFields: FieldArrayWithId<AttendanceEditInputs, "rests", "id">[];
  workDate: dayjs.Dayjs | null;
  watch: UseFormWatch<AttendanceEditInputs>;
  restRemove: UseFieldArrayRemove;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
  setValue: UseFormSetValue<AttendanceEditInputs>;
  restAppend: (
    value: RestInputs | RestInputs[],
    options?: FieldArrayMethodProps | undefined
  ) => void;
}) {
  return (
    <Stack direction="row">
      <Label variant="body1" sx={{ fontWeight: "bold", width: "150px" }}>
        休憩時間
      </Label>
      <Stack spacing={1} sx={{ flexGrow: 2 }}>
        <NoRestTimeMessage restFields={restFields} />
        {restFields.map((_, index) => (
          <RestTimeInput
            key={index}
            targetWorkDate={workDate}
            index={index}
            watch={watch}
            remove={restRemove}
            control={control}
            setValue={setValue}
          />
        ))}
        <Box>
          <IconButton
            aria-label="staff-search"
            onClick={() =>
              restAppend({
                startTime: null,
                endTime: null,
              })
            }
          >
            <AddAlarmIcon />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
}
