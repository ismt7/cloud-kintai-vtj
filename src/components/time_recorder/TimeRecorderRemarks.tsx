// cspell: ignore testid
import { useEffect, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Stack, TextField } from "@mui/material";

import { Attendance } from "../../client";

export interface TimeRecorderRemarksProps {
  attendance: Attendance | null;
  onSave: (remarks: Attendance["remarks"]) => void;
}

const TimeRecorderRemarks = ({
  attendance,
  onSave,
}: TimeRecorderRemarksProps) => {
  const [formState, setFormState] = useState<Attendance["remarks"]>(undefined);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setFormState(attendance?.remarks);
  }, [attendance]);

  useEffect(() => {
    setIsChanged(attendance?.remarks !== formState);
  }, [formState]);

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
              <IconButton onClick={() => onSave(formState)}>
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
