import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Chip, Stack, styled } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { AttendanceEditInputs } from "../../common";

const ClearButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.contrastText,
  backgroundColor: theme.palette.error.main,
  boxShadow: "none",
  "&:active": {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.contrastText,
    border: `3px solid ${theme.palette.error.main}`,
  },
}));

export default function RestEndTimeInput({
  workDate,
  index,
  control,
  setValue,
}: {
  workDate: dayjs.Dayjs;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
  setValue: UseFormSetValue<AttendanceEditInputs>;
}) {
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  if (!enableEndTime) {
    return (
      <Box>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            setEnableEndTime(true);
          }}
          sx={{ my: 1.2 }}
        >
          終了時間を追加
        </Button>
      </Box>
    );
  }

  return (
    <Stack direction="column" spacing={1}>
      <Stack spacing={1}>
        <Controller
          name={`rests.${index}.endTime`}
          control={control}
          render={({ field }) => (
            <TimePicker
              value={dayjs(field.value)}
              ampm={false}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              onChange={(newEndTime) => {
                const formattedEndTime = newEndTime
                  ? newEndTime
                      .year(workDate.year())
                      .month(workDate.month())
                      .date(workDate.date())
                      .second(0)
                      .millisecond(0)
                      .toISOString()
                  : null;
                field.onChange(formattedEndTime);
              }}
            />
          )}
        />
        <Box>
          <Chip
            label="13:00"
            variant="outlined"
            color="success"
            icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
            onClick={() => {
              const endTime = workDate
                .hour(13)
                .minute(0)
                .second(0)
                .millisecond(0)
                .toISOString();
              setValue(`rests.${index}.endTime`, endTime);
            }}
          />
        </Box>
      </Stack>
      <Box>
        <ClearButton
          variant="contained"
          size="small"
          startIcon={<ClearIcon />}
          onClick={() => {
            setValue(`rests.${index}.endTime`, null);
            setEnableEndTime(false);
          }}
        >
          終了時間をクリア
        </ClearButton>
      </Box>
    </Stack>
  );
}
