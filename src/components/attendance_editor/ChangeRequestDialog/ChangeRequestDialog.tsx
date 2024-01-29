import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Attendance,
  AttendanceChangeRequest,
  UpdateAttendanceInput,
} from "../../../API";
import BeforeCard from "./BeforeCard/BeforeCard";
import AfterCard from "./AfterCard/AfterCard";
import handleApproveChangeRequest from "./handleApproveChangeRequest";
import { useAppDispatchV2 } from "../../../app/hooks";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../../lib/reducers/snackbarReducer";
import { E04006, E04007, S04006, S04007 } from "../../../errors";
import handleRejectChangeRequest from "./handleRejectChangeRequest";
import sendRejectedChangeRequestMail from "./sendRejectedChangeRequestMail";
import sendApprovedChangeRequest from "./sendApprovedChangeRequest";
import { StaffType } from "../../../hooks/useStaffs/useStaffs";

export default function ChangeRequestDialog({
  attendance,
  updateAttendance,
  staff,
}: {
  attendance: Attendance | null;
  updateAttendance: (input: UpdateAttendanceInput) => Promise<Attendance>;
  staff: StaffType | null | undefined;
}) {
  const dispatch = useAppDispatchV2();
  const [open, setOpen] = useState(false);
  const [changeRequest, setChangeRequest] =
    useState<AttendanceChangeRequest | null>(null);
  const [comment, setComment] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!attendance?.changeRequests) {
      setOpen(false);
      return;
    }

    const changeRequests = attendance.changeRequests
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .filter((item) => !item.completed);

    if (changeRequests.length === 0) {
      setOpen(false);
      return;
    }

    setChangeRequest(changeRequests[0]);
    setOpen(true);
  }, [attendance?.changeRequests]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
      <DialogTitle>変更リクエスト</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            スタッフから勤怠情報の変更リクエストが届いています。
            <br />
            内容を確認して承認または却下してください。
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Box>
              <BeforeCard attendance={attendance} />
            </Box>
            <Box sx={{ alignSelf: "center" }}>
              <ArrowForwardIcon fontSize="large" />
            </Box>
            <Box>
              <AfterCard changeRequest={changeRequest} />
            </Box>
          </Stack>
          <Box>
            <TextField
              label="コメント"
              fullWidth
              multiline
              minRows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>閉じる</Button>
        <Button
          onClick={() => {
            handleRejectChangeRequest(attendance, updateAttendance, comment)
              .then(() => {
                dispatch(setSnackbarSuccess(S04007));
                sendRejectedChangeRequestMail(staff, attendance, comment);
                handleClose();
              })
              .catch((e: Error) => {
                console.log(e);
                dispatch(setSnackbarError(E04007));
              });
            handleClose();
          }}
          variant="contained"
          color="error"
        >
          却下
        </Button>
        <Button
          onClick={() => {
            handleApproveChangeRequest(attendance, updateAttendance, comment)
              .then(() => {
                dispatch(setSnackbarSuccess(S04006));
                sendApprovedChangeRequest(staff, attendance, comment);
                handleClose();
              })
              .catch((e: Error) => {
                console.log(e);
                dispatch(setSnackbarError(E04006));
              });
          }}
          variant="contained"
        >
          承認
        </Button>
      </DialogActions>
    </Dialog>
  );
}
