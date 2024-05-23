import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import { Box, IconButton, Stack, styled, Typography } from "@mui/material";
import { useContext } from "react";

import { AttendanceEditContext } from "../../AttendanceEditProvider";
import NoRestTimeMessage from "./NoRestTimeMessage";
import { RestTimeInput } from "./RestTimeInput/RestTimeInput";

const Label = styled(Typography)(() => ({
  width: "150px",
  fontWeight: "bold",
}));

export default function RestTimeItem() {
  const {
    workDate,
    control,
    watch,
    restFields,
    restAppend,
    restUpdate,
    restRemove,
  } = useContext(AttendanceEditContext);

  if (
    !workDate ||
    !control ||
    !watch ||
    !restAppend ||
    !restUpdate ||
    !restRemove
  ) {
    return null;
  }

  return (
    <Stack direction="row">
      <Label variant="body1" sx={{ fontWeight: "bold", width: "150px" }}>
        休憩時間
      </Label>
      <Stack spacing={1} sx={{ flexGrow: 2 }}>
        <NoRestTimeMessage restFields={restFields} />
        {restFields.map((rest, index) => (
          <RestTimeInput
            key={index}
            targetWorkDate={workDate}
            rest={rest}
            index={index}
            watch={watch}
            remove={restRemove}
            control={control}
            restUpdate={restUpdate}
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
