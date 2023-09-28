// cspell: ignore testid
import { useEffect, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Stack, TextField } from "@mui/material";

import { Attendance, Service, Staff } from "../../client";

export interface TimeRecorderRemarksProps {
  staffId: Staff["id"] | undefined;
  attendance: Attendance | null;
  callback: (value: Attendance | null) => void;
}

async function updateRemarks({
  staffId,
  attendance,
  changedRemarks,
  callback,
}: {
  staffId: TimeRecorderRemarksProps["staffId"];
  attendance: TimeRecorderRemarksProps["attendance"];
  changedRemarks: Attendance["remarks"];
  callback: (value: Attendance | null) => void;
}) {
  if (!staffId || !attendance) return;

  const { id: attendanceId } = attendance;
  const response = await Service.updateAttendance(
    attendanceId,
    {
      ...attendance,
      remarks: changedRemarks,
    },
    staffId
  ).catch((error) => {
    console.log(error);
    return null;
  });

  if (!response) {
    callback(null);
    return;
  }

  callback(response);
}

const TimeRecorderRemarks = ({
  staffId,
  attendance,
  callback,
}: TimeRecorderRemarksProps) => {
  const [formState, setFormState] = useState<Attendance["remarks"]>(undefined);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setFormState(attendance?.remarks);
  }, [attendance]);

  useEffect(() => {
    setIsChanged(attendance?.remarks !== formState);
  }, [formState]);

  const clickSaveButtonHandler = () => {
    void updateRemarks({
      staffId,
      attendance,
      changedRemarks: formState,
      callback,
    });
  };

  return (
    <Stack>
      <Box>
        <TextField
          data-testid="remarks-text"
          multiline
          minRows={2}
          fullWidth
          value={formState}
          placeholder="備考欄：客先名やイベント名などを記載"
          onChange={(event) => {
            setFormState(event.target.value);
          }}
        />
      </Box>
      <Box>
        {isChanged && (
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={0}
          >
            <Box>
              <IconButton onClick={clickSaveButtonHandler}>
                <CheckIcon color="success" data-testid="remarksSave" />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                onClick={() => {
                  setFormState(attendance?.remarks);
                }}
              >
                <ClearIcon color="error" data-testid="remarksClear" />
              </IconButton>
            </Box>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default TimeRecorderRemarks;
