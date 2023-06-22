import { useEffect, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Stack, TextField } from "@mui/material";

import { useAppSelectorV2 } from "../../app/hooks";

import {
  handleClickOfRemarksSaveButton,
  selectTimeRecorder,
} from "./TimeRecorderSlice";

const TimeRecorderRemarks = ({ staffId }: { staffId: number | undefined }) => {
  const timeRecorderData = useAppSelectorV2(selectTimeRecorder);
  const currentRemarksText = timeRecorderData.data.attendance?.remarks || "";

  const [remarksTextFieldDisabled, setRemarksTextFieldDisabled] =
    useState<boolean>(false);
  const [remarksSubmitButtonVisible, setRemarksSubmitButtonVisible] =
    useState<boolean>(false);
  const [remarksText, setRemarksText] = useState<string>(
    currentRemarksText || ""
  );
  const [remarksSubmitButtonDisabled, setRemarksSubmitButtonDisabled] =
    useState<boolean>(false);
  const [remarksClearButtonDisabled, setRemarksClearButtonDisabled] =
    useState<boolean>(true);

  useEffect(() => {
    setRemarksText(currentRemarksText || "");
    setRemarksTextFieldDisabled(false);
    setRemarksSubmitButtonDisabled(false);
    setRemarksSubmitButtonVisible(false);
    setRemarksClearButtonDisabled(false);
  }, [currentRemarksText]);

  return (
    <Stack>
      <Box>
        <TextField
          data-testid="remarks-text"
          multiline
          minRows={2}
          fullWidth
          value={remarksText}
          disabled={remarksTextFieldDisabled}
          onChange={(event) => {
            const currentRemarks = currentRemarksText || "";
            setRemarksSubmitButtonVisible(
              event.target.value !== currentRemarks
            );

            setRemarksText(event.target.value);
          }}
          placeholder="備考欄：客先名やイベント名などを記載"
        />
      </Box>
      {remarksSubmitButtonVisible && (
        <Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={0}
          >
            <Box>
              <IconButton
                disabled={remarksSubmitButtonDisabled}
                onClick={() => {
                  setRemarksTextFieldDisabled(true);
                  setRemarksClearButtonDisabled(true);
                  setRemarksSubmitButtonDisabled(true);
                  handleClickOfRemarksSaveButton({
                    staffId,
                    remarks: remarksText,
                  });
                }}
              >
                <CheckIcon color="success" data-testid="remarksSave" />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                disabled={remarksClearButtonDisabled}
                onClick={() => {
                  setRemarksText(currentRemarksText || "");
                  setRemarksSubmitButtonVisible(false);
                }}
              >
                <ClearIcon color="error" data-testid="remarksClear" />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default TimeRecorderRemarks;
